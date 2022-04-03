/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ConfigModule],
      }).compileComponents();
    })
  );

  it('should have a module definition', () => {
    expect(ConfigModule).toBeDefined();
  });
});
