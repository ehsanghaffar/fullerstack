/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { SubifyService } from './subify.service';

const mockSub1 = {
  unsubscribe: () => {
    console.log('Sub1 cancelled');
  },
};

const mockSub2 = {
  unsubscribe: () => {
    console.log('Sub2 cancelled');
  },
};

describe('SubifyService', () => {
  let service: SubifyService;
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
    TestBed.configureTestingModule({
      imports: [],
      providers: [SubifyService],
    });

    service = TestBed.inject(SubifyService);
  });

  afterAll(() => {
    service = null;
    console.log = log;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have required props and methods', () => {
    expect(service.destroy$).toBeDefined();
    expect(service.ngOnDestroy).toBeDefined();
  });

  it('track should accept subscriptions objects', () => {
    const sub1$ = mockSub1 as Subscription;
    service.track = sub1$;
    expect(service['trackedSubs'].length).toBe(1);
  });

  it('track should accept a list of subscriptions', () => {
    const sub1$ = mockSub1 as Subscription;
    const sub2$ = mockSub2 as Subscription;
    service.track = [sub1$, sub2$];
    expect(service['trackedSubs'].length).toBe(2);
  });

  it('ngOnDestroy() should complete destroy$', () => {
    const completeSpy = jest.spyOn(service.destroy$, 'complete');
    service.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('ngOnDestroy() should have cancelled subscriptions', () => {
    const sub1$ = mockSub1 as Subscription;
    service.track = sub1$;
    const sub2$ = mockSub1 as Subscription;
    service.track = sub2$;
    const logSpy = jest.spyOn(console, 'log');
    service.ngOnDestroy();
    expect(logSpy).toHaveBeenCalled();
  });

  it('ngOnDestroy() should handle invalid subscriptions', () => {
    const sub1$ = {} as Subscription;
    service.track = [sub1$];
    const logSpy = jest.spyOn(console, 'log');
    service.ngOnDestroy();
    expect(logSpy).not.toHaveBeenCalled();
  });
});
