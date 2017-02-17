import { ReflectiveInjector } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { SYMBOLS } from './constants';
import { Persist } from './decorators';

export function isArguments(obj: any): boolean {
  return {}.toString.call(obj) === '[object Arguments]';
}

export function isArray(obj: any): boolean {
  return {}.toString.call(obj) === '[object Array]';
}

export function isBool(obj: any): boolean {
  return {}.toString.call(obj) === '[object Boolean]';
}

export function isFalsy(obj: any): boolean {
  return (isUndefined(obj) || isNull(obj) || isNaN(obj) ||
  obj === '' || obj === 0 || (isBool(obj) && Boolean(obj) === false));
}

export function isInfinite(obj: any): boolean {
  return obj === Infinity || obj === -Infinity;
}

export function isFunction(obj: any): boolean {
  return ({}.toString.call(obj) === '[object Function]');
}

export function isNaN(obj: any): boolean {
  return typeof obj === 'number' && obj !== obj;
}

export function isNull(obj: any): boolean {
  return {}.toString.call(obj) === '[object Null]';
}

export function isNumber(obj: any): boolean {
  return {}.toString.call(obj) === '[object Number]';
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object';
}

export function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && {}.toString.call(obj) === '[object Object]';
}

export function isRegExp(obj: any): boolean {
  return {}.toString.call(obj) === '[object RegExp]' || obj instanceof RegExp;
}

export function isString(obj: any): boolean {
  return typeof obj === 'string' && {}.toString.call(obj) === '[object String]';
}

export function isUndefined(obj: any): boolean {
  return typeof obj === 'undefined';
}

export function stringCamelToSnake(camelCase: string): string {
  return stringCamel(camelCase, m => '_' + m.toLowerCase());
}

export function stringCamelToKebab(camelCase: string): string {
  return stringCamel(camelCase, m => '-' + m.toLowerCase());
}

export function stringSnakeToKebab(snakeCase: string): string {
  return snakeCase.replace(/_/g, '-');
}

export function stringSnakeToUpperCamel(snakeCase: string): string {
  return snakeCase.replace(/(^|_)([A-Za-z0-9])/g, (match) => {
    // For start of line case, match[0] != first match, hence we always calculate the
    // index of the 2nd match in the regexp.
    return match[match.length - 1].toUpperCase();
  });
}

export function stringSnakeToLowerCamel(snakeCase: string): string {
  return snakeCase.replace(/_([A-Za-z0-9])/g, (match) => {
    return match[1].toUpperCase();
  });
}

export function capitalizeFirstChar(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function stringCamel(value: string, replaceFn: (match: string) => string): string {
  return value
    .replace(/^([A-Z])/, m => m.toLowerCase()) // first char if upper case to lower case
    .replace(/([A-Z])/g, replaceFn); // remaining upper case to the match fn
}

// return an array of objects according to key, value, or key and value matching
export function where(obj: {}, key: string, val: any): any[] {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    if (typeof obj[i] === 'object') {
      objects = objects.concat(where(obj[i], key, val));
    } else {
      // if key matches and value matches or if key matches and value
      // is not passed (eliminating the case where key matches but passed value does not)
      if (i === key && obj[i] === val || i === key && val === '') { //
        objects.push(obj);
      } else if (obj[i] === val && key === '') {
        // only add if the object is not already in the array
        if (objects.lastIndexOf(obj) === -1) {
          objects.push(obj);
        }
      }
    }
  }

  return objects;
}

// return an array of values that match on a certain key
export function whereKey(obj: {}, key: string): any[] {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    if (typeof obj[i] === 'object') {
      objects = objects.concat(whereKey(obj[i], key));
    } else if (i === key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

// return an array of keys that match on a certain value
export function whereValue(obj, val): any[] {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }
    if (typeof obj[i] === 'object') {
      objects = objects.concat(whereValue(obj[i], val));
    } else if (obj[i] === val) {
      objects.push(i);
    }
  }
  return objects;
}

(<any>Object).chain = function(cls, proto) {
  if (arguments.length < 2) {
    throw new TypeError('Function chain - Not enough arguments');
  }

  if (typeof proto !== 'object' && typeof proto !== 'string') {
    throw new TypeError('second argument to Function chain must be an object or a string');
  }

  let oNewProto = proto;
  let oReturn, o2nd, oLast;
  oReturn = o2nd = oLast = cls instanceof this ? cls : new cls.constructor(cls);

  for (let o1st = this.getPrototypeOf(o2nd);
    o1st !== Object.prototype && o1st !== Function.prototype;
    o1st = this.getPrototypeOf(o2nd)
  ) {
    o2nd = o1st;
  }

  if (proto.constructor === String) {
    oNewProto = Function.prototype;
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }

  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
}

export function createAndResolve(...providers): ReflectiveInjector {
  return ReflectiveInjector.resolveAndCreate(providers);
}

export function authorizeHeaders(): RequestOptions {
  let persist = Persist()(function(){});
  let storage = null;

  try {
    storage = JSON.parse(persist.get(SYMBOLS.USER));
  } catch (error) {}

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (storage) {
    headers.append('Authorization', 'Bearer ' + storage.accessToken);
  }

  return  new RequestOptions({ headers: headers });
}

export function windowSize() {
  const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  return {
    width: width,
    height: height
  };
}
