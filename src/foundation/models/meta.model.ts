import { makePropDecorator } from '@angular/core/src/util/decorators';

import { get } from 'lodash';

import { BaseModel } from './base.model';
import { stringCamelToSnake } from '../support';

export type RelationFunction = (json: Object | {}[]) => Object;

/**
 * Attribute definition.
 *
 * @export
 * @interface AttributeDecorator
 */
export interface AttributeDecorator {
  /**
   * Attribute name field.
   *
   * @type {string}
   * @memberOf AttributeDecorator
   */
  name?: string;
  /**
   * Attribute metadata deifnition.
   *
   * @type {Object}
   * @memberOf AttributeDecorator
   */
  meta?: Object;
  /**
   * Attribute object with function toJSON and toModel
   * to convert attribute type.
   *
   * @type {Object}
   * @memberOf AttributeDecorator
   */
  converter?: Object;
  /**
   * Validators to run on set.
   *
   * @type {any[]}
   * @memberOf AttributeDecorator
   */
  validators?: any[];
  /**
   * Attribute unchange
   *
   * @type {boolean}
   * @memberOf AttributeDecorator
   */
  transient?: boolean;
  /**
   * Attribut. to perform relation and creation of
   * the model related.
   *
   *
   * @memberOf AttributeDecorator
   */
  relation?: RelationFunction;
}

export const Attribute = <(options?: AttributeDecorator) => any>makePropDecorator(
  'Attribute',
  [{
    name: null,
    meta: null,
    converter: null,
    validators: [],
    transient: false,
    relation: (json: Object | {}[]) => Object
  }]
);

/**
 * Entity to perform actions on target that will
 * be decorated (class) in case.
 *
 * @class EntityMetadata
 */
class EntityDecorator {

  /**
   * Define attribute metadata.
   *
   * @static
   * @param {string} prop
   * @param {AttributeDecorator} metadata
   * @param {Object} [option]
   *
   * @memberOf EntityMetadata
   */
  static createModelAttribute(prop: string, metadata: AttributeDecorator, option?: Object) {
    metadata.name = stringCamelToSnake(prop);
    metadata.validators = get(metadata, 'validators', []);
    metadata.meta = option || {};

    if (metadata.converter === null) {
      metadata.converter = {
        /**
         * Convert from model to Json.
         *
         * @param {Object} modelValue
         * @returns {Object}
         */
        toJSON: (modelValue: Object): Object => modelValue,
        /**
         * Convert from json to model
         *
         * @param {Object} jsonValue
         * @returns {Object}
         */
        toModel: (jsonValue: Object): Object => jsonValue
      };
    }
  }
}

/**
 * Decorator to apply on the model class.
 *
 * @export
 * @param {*} [meta]
 * @returns
 */
export function Entity(meta?: any) {
  return function (target: any) {

    if (!(target.prototype instanceof BaseModel)) {
      throw new Error(`Class ${target.name} must extend from BaseModel.`);
    }

    let metadata = Reflect.getMetadata('propMetadata', target);
    let parent = Object.getPrototypeOf(target.prototype).constructor;

    Object.keys(metadata).forEach((key: string) => {
      let option = (meta && meta.hasOwnProperty('attributes')) ? meta.attributes[key] : {};

      EntityDecorator.createModelAttribute(key, metadata[key][0], option);

      Object.defineProperty(
        target.prototype,
        key,
        { writable: true, enumerable: false, configurable: false, value: null }
      );
    });

    Reflect.defineMetadata('propMetadata', metadata, parent);

    return target;
  };
}
