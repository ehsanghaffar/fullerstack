/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */

import { I18nConfig } from './i18n.model';

export const DefaultI18nConfig: I18nConfig = {
  defaultLanguage: 'en',
  availableLanguages: ['de', 'en', 'es', 'fa', 'fr', 'he', 'zh-hans'],
  enabledLanguages: ['de', 'en', 'es', 'fa', 'fr', 'he', 'zh-hans'],
  translationDirectory: 'assets/i18n/',
};
