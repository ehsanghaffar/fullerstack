/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { deepFreeze, getUniqueString, isFunction } from './store.util';

describe('Store:Util:Freeze', () => {
  it('should mutate an unfrozen flat object', () => {
    const flatObject = { a: 1 };
    flatObject.a = 1;
    expect(flatObject.a).toEqual(1);
  });

  it('should not mutate a frozen flat object', () => {
    const flatObject = { a: 1 };
    const frozenValue = deepFreeze(flatObject);
    expect(() => {
      frozenValue.a = 1;
    }).toThrow("Cannot assign to read only property 'a' of object '#<Object>'");
  });

  it('should mutate an unfrozen nested object', () => {
    const nestObject = {
      a: 1,
      b: {
        c: {
          d: 1,
        },
      },
    };

    nestObject.b = { c: { d: 2 } };
    expect(nestObject.b.c.d).toEqual(2);
  });

  it('should not mutate a frozen nested object', () => {
    const nestObject = {
      a: 1,
      b: {
        c: {
          d: 1,
        },
      },
    };

    const frozenValue = deepFreeze(nestObject);

    expect(() => {
      frozenValue.b = { c: { d: 2 } };
    }).toThrow("Cannot assign to read only property 'b' of object '#<Object>'");
  });

  it('should mutate a frozen nested object after object.assign()', () => {
    const nestObject = {
      a: 1,
      b: {
        c: {
          d: 1,
        },
      },
    };

    const frozenValue = deepFreeze(nestObject);

    const newNestObject = Object.assign({}, frozenValue, { b: { c: { d: 1 } } });

    expect(() => {
      newNestObject.b = { c: { d: 2 } };
    }).not.toThrow("Cannot assign to read only property 'b' of object '#<Object>'");
  });

  it('should mutate a frozen nested object after spread operation {...}', () => {
    const nestObject = {
      a: 1,
      b: {
        c: {
          d: 1,
        },
      },
    };

    const frozenValue = deepFreeze(nestObject);

    const newNestObject = { ...frozenValue, ...{ b: { c: { d: 1 } } } };

    expect(() => {
      newNestObject.b = { c: { d: 2 } };
    }).not.toThrow("Cannot assign to read only property 'b' of object '#<Object>'");
  });

  it('return true for a function', () => {
    expect(
      isFunction(() => {
        return 'hello';
      })
    ).toBeTruthy;
  });

  it('return false for a non-function', () => {
    expect(isFunction('foo-bar')).toBeFalsy;
    expect(isFunction({})).toBeFalsy;
  });

  it('return a unique number with low collision possibility', () => {
    const values = {
      one: getUniqueString(),
      two: getUniqueString(),
    };
    expect(values.one).not.toEqual(values.two);
  });
});
