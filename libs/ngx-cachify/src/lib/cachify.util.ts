/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpContext } from '@angular/common/http';

import { CACHIFY_CONTEXT_TOKEN, DefaultContextMeta, DefaultFetchPolicies } from './cachify.default';
import { CachifyContextMeta, CachifyFetchPolicy } from './cachify.model';

/**
 * Class to create ordered path to our internal state/store
 */
export class OrderedStatePath {
  private map = new Map<string | number, string | number>();

  /**
   * Add a key,value pair to internal map
   * @param key Key of a tuple
   * @param value Value of a tuple
   * @returns A map of key,value pairs
   * Note: value = '*' means catch all
   */
  append(key: string | number, value: string | number) {
    key = this.stringToKey(`${key}`);
    if (!key?.length) {
      throw Error('Error: empty key is not allowed!');
    }

    value = this.stringToKey(`${value}`);
    if (!value?.length) {
      throw Error('Error: empty value is not allowed!');
    }

    this.map = this.map.set(key, value);
    return this;
  }

  /**
   * Cleans up an input string consumable by objects as key or value
   * @param input A key or a value
   */
  stringToKey(input: string): string {
    return `${input}`
      .replace(/\s+/gm, '') // convert to single line
      .replace(/\./g, '_') // replace . with _
      .replace(/_+/g, '_') // replace multiple _ with single _
      .replace(/^[_]+|[_]+$/g, '') // remove _ from start & end
      .trim();
  }

  /**
   * Converts the internal key,value map to a dot-separated string
   * @returns  A dot-separated string (a path into the state object in the store)
   */
  toString() {
    const levels = [];
    this.map.forEach((value, key) => {
      levels.push(`${key}.[${value}]`);
    });
    return levels.join('.').replace(/\s+/g, '');
  }
}

/**
 * Returns true if fetch policy exists and is enabled
 * @param policy Fetch policy type
 */
export function isPolicyEnabled(policy: string): boolean {
  const enabled = Object.keys(DefaultFetchPolicies).find(
    (key) => DefaultFetchPolicies[key] === policy
  );
  return !!enabled;
}

/**
 * Returns cachify meta data
 * @param meta http metadata passed in as context
 * @returns context object
 */
export function makeCachifyContext(meta: CachifyContextMeta, ctx?: HttpContext): HttpContext {
  return (ctx || new HttpContext()).set<CachifyContextMeta>(CACHIFY_CONTEXT_TOKEN, {
    ...meta,
    policy: meta.policy || CachifyFetchPolicy.NetworkFirst,
  });
}

/**
 * Return cachify context if available
 * @param context
 * @returns return caching meta data if available or default value (no caching)
 */
export function getCachifyContextMeta(ctx: HttpContext): CachifyContextMeta {
  return ctx.get<CachifyContextMeta>(CACHIFY_CONTEXT_TOKEN) || DefaultContextMeta;
}
