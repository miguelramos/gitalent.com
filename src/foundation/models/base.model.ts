import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { isArray } from '../support';
import { Collection } from './collection';

export abstract class BaseModel {

  private store: BehaviorSubject<typeof BaseModel>;

  constructor(data?: any, options?: { failOnMissingFields: boolean }) {
    this.store = new BehaviorSubject(null);

    if (data === null) {
      return;
    }

    this.processMetaFields(data, options);
  }

  public setData(data): void {
    this.processMetaFields(data, { failOnMissingFields: false });
  }

  public setChanges(value: any): void {
    this.store.next(value);
  }

  public changes(): Observable<typeof BaseModel> {
    return this.store.asObservable();
  }

  private processMetaFields(data: any, options: any) {
    const meta = Reflect.getMetadata('propMetadata', this.constructor);

    const unprocessedKeys: string[] = [];

    /* tslint:disable */
    for (let jsonField in data) {
      unprocessedKeys.push(jsonField);
    }
    /* tslint:enable */

    if (meta) {
      /* tslint:disable */
      for (let field in meta) {

        const propDecorator = meta[field][0];
        const name = propDecorator.name;
        const converter = propDecorator.converter;
        const value = data[name];

        if (propDecorator.transient) {
          continue;
        }

        const unprocessedKeysIndex = unprocessedKeys.indexOf(name);

        if (unprocessedKeysIndex >= 0) {
          unprocessedKeys.splice(unprocessedKeysIndex, 1);
        }

        let attributeValue: Object;

        if (value === undefined) {
          continue;
        } else if (propDecorator.relation) {
          // TODO: create new Model;
          attributeValue = this.processMetaRelation(propDecorator.relation, value);
        } else {
          attributeValue = converter.toModel(value);
        }

        Object.defineProperty(this, field, { value: attributeValue });
      }
      /* tslint:enable */

      if (unprocessedKeys.length > 0) {
        if ((options && options.failOnMissingFields)) {
          throw new Error(
            `Didn\'t recognise keys in ${this.constructor.name} JSON: ${unprocessedKeys}`
          );
        } else {
          console.group('ENTITY MODEL WARNING');
          console.warn(`Didn\'t recognise keys in ${this.constructor.name} JSON: `);
          console.log(unprocessedKeys);
          console.groupEnd();
        }
      }
    } else {
      throw new Error(`Model wasn't decorated by @Entity. Please annotate your model.`);
    }
  }

  private processMetaRelation(cls: (data) => Object|typeof BaseModel, resource: Object|Array<Object>) {
    let values = new Collection<typeof BaseModel>(null);

    if (isArray(resource)) {
      (<Object[]>resource).forEach(item => values.add(this.processMetaRelation(cls, item)));
    } else {
      let model = cls(resource);

      return (model instanceof BaseModel) ? model : resource;
    }

    return values;
  }

}
