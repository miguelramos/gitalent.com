import { Injectable } from '@angular/core';

import { isObject, mapKeys, set, startsWith, isArray } from 'lodash';

/**
 * Interface description for options
 *
 * @export
 * @interface Configurator
 */
export interface Configurator {
  [key: string]: any;
}

/**
 * Class to centralized configurations values.
 *
 * @export
 * @class Configurator
 */
@Injectable()
export class Configurator {
  private repository: Configurator = <Configurator>{};

  constructor(options?: any) {
    this.options = options || {};
  }

  /**
   * Set a new option on the configurator. If an object
   * is passed will be converted to a flat string value.
   *
   * @param {(string | Object)} name
   * @param {*} value
   *
   * @memberOf Configurator
   */
  setOption(name: string | {}, value?: any): void {
    isObject(name) ? this.flat(name) : (this.repository[<string>name] = value);
  }

  /**
   * Get a configuration value from the collection.
   *
   * @param {string} name (Key name on collection)
   * @param {*} [defaults=null] (Default value if not exist)
   * @returns {*}
   */
  getOption(name: string, defaults: any = null): any {
    return this.hasOption(name) ? this.repository[name] : defaults;
  }

  /**
   * Get a dot notation string and converts
   * to json object.
   *
   * @param {string} rootKey
   * @param {boolean} [fromRoot=true]
   * @returns {*}
   *
   * @memberOf Configurator
   */
  getOptionTree<C>(rootKey: string, fromRoot = true): C {
    let tree = <C>{};

    mapKeys(this.options, (value: any, key: string) => {
      if (startsWith(key, rootKey)) {
        set(tree, key, value);
      }

      return key;
    });

    return fromRoot ? tree : tree[rootKey];
  }

  /**
   * Get all options defined.
   *
   * @type {Configurator}
   * @memberOf Configurator
   */
  get options(): Configurator {
    return this.repository;
  }


  /**
   * Seeter to flat options object.
   *
   * @memberOf Configurator
   */
  set options(opt: Configurator) {
    this.flat(opt);
  }

  /**
   * Verify if option name exists on the collection.
   *
   * @param {string} name (description)
   * @returns {boolean} (description)
   */
  hasOption(name: string): boolean {
    return this.repository.hasOwnProperty(name);
  }

  /**
   * Converts a tree object keys in flat
   * key string in one level.
   *
   * {
   *  name: '',
   *  profile: {
   *    email: ''
   *  }
   * }
   *
   * to: {'name': '', 'profile.email': ''}
   *
   * @private
   * @param {*} config (Configuration object)
   * @param {string} [key=''] (Append key tree to flat)
   */
  private flat(config: any, key = '') {
    let path: string = + (key === '') ? key : key + '.';

    Object.keys(config).forEach((keyId: string) => {
      if (isObject(config[keyId]) && !isArray(config[keyId])) {
        this.flat(config[keyId], path + keyId);
      } else {
        this.setOption(`${path + keyId}`, config[keyId]);
      }
    });
  }
}
