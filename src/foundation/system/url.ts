import { Injectable } from '@angular/core';

const VerEx = require('verbal-expressions');

import { head, isEmpty } from 'lodash';
import { SYMBOLS } from '../support';
import { Configurator } from './configurator';

@Injectable()
export class Url {
  static SITE: string = '@site';
  static AUTH: string = '@auth';
  static LOCAL: string = '@local';
  static DOMAIN: string = '@domain';

  public isPublic: boolean = true;
  public routes: Map<any, any> = new Map();

  private escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  private namedParam = /(\(\?)?:\w+/g;
  private optionalParam = /\((.*?)\)/g;
  private splatParam = /\*\w+/g;
  // Cached regex for stripping a leading hash/slash and trailing space.
  private routeStripper = /^[#\/]|\s+$/g;
  // Cached regex for removing a trailing slash.
  private trailingSlash = /\/$/;

  constructor(
    private configurator: Configurator
  ) {
    // this.init();
  }

  get(name: string, domain: string = null, withoutPrefix = true) {
    if (withoutPrefix) {
      name = this.removePrefix(name);
    }

    let route = <string>this.routes.get(name);

    const verbal = (<VerbalExpression>VerEx()).startOfLine().find('@').word();

    const search = head(verbal.exec(route)) || '';

    if (search && !isEmpty(search) ) {
      return this.definition(search)(route.replace(search, ''));

      /*const type = search.substring(1, search.length).toUpperCase();
      const domain = this.configurator.getOption(`DOMAINS.${type}`);
      const env = this.configurator.getOption(SYMBOLS.ENVIRONMENT);
      const host = this.configurator.getOption(`HOSTS.${env.toUpperCase()}`);
      const version = this.configurator.getOption('API_VERSION');
      const uri = `http://${domain}.${host}/${version}`;*/
    }

    return search;
  }

  add(route, name) {
    this.routes.set(name, route);
  }

  expression(route: string) {
    route = route
      .replace(this.escapeRegExp, '\\$&')
      .replace(this.optionalParam, '(?:$1)?')
      .replace(this.namedParam, (match, optional) => {
        return optional ? match : '([^/?]+)';
      })
      .replace(this.splatParam, '([^?]*?)');

    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  }

  match(route) {
    let regex = this.expression(route);
    let routes = null;

    this.routes.forEach((value, name) => {
      if (regex.test(value)) {
        let params = [];
        if (routes === null) { routes = {}; }

        regex.exec(value).slice(1).forEach(function(param) {
          if (param) {
            params.push(decodeURIComponent(param));
          }
        });

        routes[name] = {
          name: name,
          url: value,
          route: route,
          params: params,
          regex: regex.source
        };
      }
    });

    return routes;
  }

  private definition(prefix: string)  {
    let knowed = [Url.SITE, Url.AUTH, Url.DOMAIN, Url.LOCAL];

    if (knowed.indexOf(prefix) < 1) {
      return () => { return ''; };
    }

    const factoryFunction = (name: string, fn: Function): Function => {
      return (new Function(`
        return function (call) {
          return function ${name}() {
            return call(this, arguments)
          };
        };
      `)())(Function.apply.bind(fn));
    };

    const factories = {
      local: (route: string): string => {
        return route;
      },
      auth: (route: string, domain: string) => {}
    };

    const type = prefix.substring(1, prefix.length);

    return factoryFunction.call(this, type, factories[type].bind(this));
  }

  private removePrefix(name: string): string {
    return name.substring(10, name.length);
  }

  private init() {
    const { keys }  = Object;
    const endpoints = <{ [key: string]: string }>this.configurator.getOptionTree(SYMBOLS.ENDPOINTS, false);

    keys(endpoints).forEach(key => this.add(endpoints[key], key));
  }
}
