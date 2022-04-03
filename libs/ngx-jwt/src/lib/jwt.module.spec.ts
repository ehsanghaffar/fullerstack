/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { TestBed, waitForAsync } from '@angular/core/testing';

import { JwtModule } from './jwt.module';

describe('JwtModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [JwtModule],
      }).compileComponents();
    })
  );

  it('should have a module definition', () => {
    expect(JwtModule).toBeDefined();
  });
});
