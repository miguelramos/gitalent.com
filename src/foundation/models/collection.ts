import { Injectable } from '@angular/core';

import { find, includes, head, last } from 'lodash';

import { BaseModel } from './base.model';

@Injectable()
export class Collection<M> {

  private collection: M[] = [];
  private model: new (data) => M;

  constructor(resource: any, model?: any) {
    if (resource === null) {
      return;
    }

    this.model = model;
    this.createModel(resource);
  }

  all(): M[] {
    return this.collection;
  }

  find(item: any|any[]): M {
    return find(this.collection, item);
  }

  exist(item: any): boolean {
    return includes(this.collection, item);
  }

  add(item: any): void {
    this.collection.push(item);
  }

  first(): M {
    return head(this.collection);
  }

  last(): M {
    return last(this.collection);
  }

  getByIndex(index: number): M {
    return this.collection[index];
  }

  isEmpty(): boolean {
    return this.collection.length > 0 ? false : true;
  }

  count(): number {
    return this.collection.length;
  }

  private createModel(data) {
    let list = [].concat(data);
    let model = this.model;

    this.collection = model ? list.map<M>(item => new model(item)) : list;
  }
}
