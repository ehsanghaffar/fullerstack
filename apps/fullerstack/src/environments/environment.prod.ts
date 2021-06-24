/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { CachifyConfig } from '@fullerstack/ngx-cachify';
import { ApplicationConfig } from '@fullerstack/ngx-config';
import { GqlConfig } from '@fullerstack/ngx-gql';
import { GTagConfig } from '@fullerstack/ngx-gtag';
import { I18nConfig } from '@fullerstack/ngx-i18n';
import { LogLevels, LoggerConfig } from '@fullerstack/ngx-logger';

const logger: LoggerConfig = {
  level: LogLevels.error,
} as const;

const gql: GqlConfig = {
  endpoint: 'http://localhost:4201/graphql',
} as const;

const gtag: GTagConfig = {
  trackingId: 'U-something',
  isEnabled: false,
} as const;

const cachify: CachifyConfig = {
  disabled: false,
  immutable: true, // minimally set to true during development
  ttl: 60, // 1 minute
} as const;

const i18n: I18nConfig = {
  availableLanguages: {
    en: {
      name: 'English',
      locale: '@angular/common/locales/en',
      localeExtra: '@angular/common/locales/extra/en',
    },
    fr: {
      name: 'Français',
      locale: '@angular/common/locales/fr',
      localeExtra: '@angular/common/locales/extra/fr',
    },
    de: {
      name: 'Deutsch',
      locale: '@angular/common/locales/de',
      localeExtra: '@angular/common/locales/extra/de',
    },
    es: {
      name: 'Español',
      locale: '@angular/common/locales/es',
      localeExtra: '@angular/common/locales/extra/es',
    },
    he: {
      name: 'עִברִית',
      locale: '@angular/common/locales/he',
      localeExtra: '@angular/common/locales/extra/he',
    },
    fa: {
      name: 'پارسی',
      locale: '@angular/common/locales/fa',
      localeExtra: '@angular/common/locales/extra/fa',
    },
    'zh-hans': {
      name: '中文 - 简体',
      locale: '@angular/common/locales/zh-Hans',
      localeExtra: '@angular/common/locales/extra/zh-Hans',
    },
  },
  enabledLanguages: [
    // order is important
    'en',
    'fr',
    'zh-hans',
    'de',
    'es',
    'he',
    'fa',
  ],
  cacheBustingHash: 'v0.0.1',
};

export const environment: Readonly<ApplicationConfig> = {
  version: '0.0.1',
  production: false,
  appName: 'FullerStack',
  logger,
  i18n,
  gql,
  gtag,
  cachify,
};
