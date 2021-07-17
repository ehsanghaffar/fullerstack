/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

export interface JwtDto {
  userId: string;
  sessionVersion?: number;
}

export const JWT_BEARER_REALM = 'Bearer';
