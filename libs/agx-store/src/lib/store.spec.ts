/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { StoreStateType } from './store.model';
import { StoreState } from './store.state';

jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('Store:[Claim,Release,Slice,Immutable]', () => {
  let store = new StoreState<StoreStateType>({ A: { C: { D: 1 } }, B: 2 } as StoreStateType, true);

  afterAll(() => {
    store = null;
  });

  it('should work', () => {
    expect(store).toBeTruthy();
  });

  it('should create a slice', () => {
    const sliceName = 'auth';
    const claimId = store.claimSlice(sliceName, console.log);
    expect(claimId).toBeTruthy();
    store.releaseSlice(claimId);
  });

  it('should not create duplicate slice', () => {
    const sliceName = 'auth';
    const claimId = store.claimSlice(sliceName, console.log);
    expect(() => {
      store.claimSlice(sliceName, console.log);
    }).toThrow('claimSlice: Slice auth already claimed (auth)');
    store.releaseSlice(claimId);
  });

  it('should be immutable: getState', () => {
    const snapshot = store.getState();
    expect(() => {
      snapshot.A = 1;
    }).toThrow("Cannot assign to read only property 'A' of object '#<Object>'");
  });

  it('should be immutable: Select', (done) => {
    const defaultAuth = { E: { F: 2 }, Z: 2 };
    const claimId = store.claimSlice('auth', console.log);
    store.select$('auth').subscribe((state: any) => {
      expect(() => {
        state.E = 1;
      }).toThrow("Cannot assign to read only property 'E' of object '#<Object>'");
      store.releaseSlice(claimId);
      done();
    });
    store.setState(claimId, defaultAuth);
  });

  it('should log set state', () => {
    const sliceName = 'auth';
    const origLog = console.log;
    console.log = jest.fn();
    const claimId = store.claimSlice(sliceName, console.log);
    const logSpy = jest.spyOn(console, 'log');
    store.setState(claimId, { a: 1 }, 'INIT_STATE');
    expect(logSpy).toHaveBeenCalledTimes(2);
    console.log = origLog;
  });
});

describe('Store:[mutable]', () => {
  let store = new StoreState<StoreStateType>({ A: { C: { D: 1 } }, B: 2 } as StoreStateType, true);

  afterAll(() => {
    store = null;
  });

  it('should work', () => {
    expect(store).toBeTruthy();
  });

  it('should be mutable: getState', () => {
    const snapshot = store.getState();
    expect(() => {
      snapshot.A = 1;
    }).not.toThrow("Cannot assign to read only property 'A' of object '#<Object>'");
  });

  it('should be mutable: Select', (done) => {
    const defaultAuth = { E: { F: 2 }, Z: 2 };
    const claimId = store.claimSlice('auth', console.log);
    store.select$('auth').subscribe((state: any) => {
      expect(() => {
        state.E = 1;
      }).not.toThrow("Cannot assign to read only property 'E' of object '#<Object>'");
      done();
    });
    store.setState(claimId, defaultAuth);
  });
});
