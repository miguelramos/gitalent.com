import { SYMBOLS } from './constants';
import { Framework } from '../framework';
import { State, UINavbarState } from '../system';

import { makeDecorator } from '@angular/core/src/util/decorators';

import { head, merge } from 'lodash';

const STORE = require('store');
const { defineProperty } = Object;

export interface UIDecorator {
  footer?: boolean;
  navigator?: UINavbarState;
}

export class UIElement {}

export function UI(meta?: UIDecorator): any {
  let decorator = <(meta?: UIDecorator) => any>makeDecorator(
    'UI',
    <UIDecorator>{
      footer: undefined,
      navigator: undefined
    },
    UIElement
  );

  return function (cls) {
    let onInit = cls.prototype.ngOnInit || function() { };
    let onSetup = cls.prototype.ngOnSetup;

    return (<any>decorator(meta)).Class({
      // extends: Object.prototype.constructor,
      constructor: cls,
      ngOnSetup: function () {
        let state: State = this.state || null;

        const isUIElement = annotation => annotation instanceof UIElement;
        const getAnnotation = annotation => annotation;

        const annotations: any[] = Reflect.getOwnMetadata('annotations', cls);

        const annotation: UIDecorator = head(annotations.filter(isUIElement).map(getAnnotation));

        if (!this.hasOwnProperty('state')) {
          let injector = Framework.getApplicationInjector();
          state = <State>injector.get(State);
        }

        if (annotation.footer) {
          let footer = state.get(SYMBOLS.UI_STATE_FOOTER);
          state.set(SYMBOLS.UI_STATE_FOOTER, merge(footer, { enable: annotation.footer }));
        }

        if (annotation.navigator) {
          let nav = state.get(SYMBOLS.UI_STATE_NAVBAR);
          state.set(SYMBOLS.UI_STATE_NAVBAR, merge(nav, annotation.navigator));
        }
      },
      ngOnInit: function () {
        onInit.call(this);
        onSetup ? onSetup.call(this) : this.ngOnSetup();
      }
    });
  };
}

export interface PersistDecorator {
  set(key: string, value: any): void;
  get(key: string): string;
  all(): any;
  delete(key: string): void;
  clear(): void;
  supported(): boolean;
}

export function Persist(): (target) => PersistDecorator {
  return function (target) {

    defineProperty(target.prototype, 'set', {
      value: function (key: string, value: any): void {
        STORE.set(key, JSON.stringify(value));
      }
    });

    /**
     * Get data from local storage identified by key.
     *
     * @param {string} key
     * @returns
     */
    defineProperty(target.prototype, 'get', {
      value: function (key: string): string {
        return STORE.get(key);
      }
    });

    /**
     * Get all data persisted on local storage.
     *
     * @returns
     */
    defineProperty(target.prototype, 'all', {
      value: function () {
        return STORE.getAll();
      }
    });

    /**
     * Deletes data on local storage
     * identified by key.
     *
     * @param {string} key
     */
    defineProperty(target.prototype, 'delete', {
      value: function (key: string): void {
        STORE.remove(key);
      }
    });

    /**
     * Clear all local storage data.
     */
    defineProperty(target.prototype, 'clear', {
      value: function (): void {
        STORE.clear();
      }
    });

    /**
     * Check if browser support local
     * storage feature.
     *
     * @returns {boolean}
     */
    defineProperty(target.prototype, 'supported', {
      value: function (): boolean {
        return !!STORE.enabled;
      }
    });

    return target;
  };
}
