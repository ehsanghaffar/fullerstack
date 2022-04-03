/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private subject = new BehaviorSubject<boolean>(false);
  private inflight = 0;
  state$: Observable<boolean>;

  constructor() {
    this.state$ = this.subject.asObservable();
  }

  start() {
    this.inflight++;
    this.subject.next(this.inflight > 0);
  }

  end() {
    this.inflight--;
    this.subject.next(this.inflight > 0);
  }
}
