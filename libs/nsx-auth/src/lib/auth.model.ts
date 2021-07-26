/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { Directive, Field, InputType, ObjectType } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { AUTH_PASSWORD_MIN_LENGTH } from './auth.constant';

export interface SecurityConfig {
  accessTokenExpiry: string | number;
  sessionTokenExpiry: string | number;
  bcryptSaltOrRound: string | number;
}

export interface AuthFilterType<T> {
  include?: T[];
  exclude?: T[];
}

@ObjectType()
export class AuthStatusDto {
  @Field({ nullable: true })
  message?: string;

  @Field()
  ok: boolean;
}

/**
 * Auth token (server -> client)
 */
@ObjectType()
export class AuthTokenDto {
  @Field()
  token: string;

  @Field({ nullable: true })
  message?: string;

  @Field()
  ok?: boolean;
}

/**
 * User creation type (client -> server)
 */
@InputType()
export class AuthUserCreateInput {
  @Directive('@lowercase')
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(AUTH_PASSWORD_MIN_LENGTH)
  password: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;
}

/**
 * Authentication type (client -> server)
 */
@InputType()
export class AuthUserCredentialsInput {
  @Directive('@lowercase')
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

/**
 * Authentication type (client -> server)
 */
@InputType()
export class AuthUserVerifyInput {
  @Field()
  @IsNotEmpty()
  token: string;
}

/**
 * Authentication type (client -> server)
 */
@InputType()
export class AuthPasswordResetPerformInput {
  @Field()
  @IsNotEmpty()
  token: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field({ defaultValue: false })
  resetOtherSessions: boolean;
}

/**
 * Authentication type (client -> server)
 */
@InputType()
export class AuthPasswordVerifyResetRequestInput {
  @Field()
  @IsNotEmpty()
  token: string;
}

/**
 * Password change input type (client -> server)
 */
@InputType()
export class AuthPasswordChangeInput {
  @Field()
  @IsNotEmpty()
  @MinLength(AUTH_PASSWORD_MIN_LENGTH)
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(AUTH_PASSWORD_MIN_LENGTH)
  newPassword: string;

  @Field({
    defaultValue: false,
    description: 'Force authentication on all other active sessions',
  })
  resetOtherSessions: boolean;
}

@InputType()
export class AuthPasswordChangeRequestInput {
  @Directive('@lowercase')
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class AuthPasswordVerifyInput {
  @Field()
  @IsNotEmpty()
  @MinLength(AUTH_PASSWORD_MIN_LENGTH)
  password: string;
}

@InputType()
export class AuthEmailVerifyAvailabilityInput {
  @Directive('@lowercase')
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class AuthEmailChangeRequestInput {
  @Directive('@lowercase')
  @Field()
  @IsEmail()
  email: string;
}
