/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { i18nExtractor as _ } from '@fullerstack/ngx-i18n';

import { FooterItem } from './footer.model';

@Component({
  selector: 'fullerstack-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() appName = 'Fullerstack';

  today = new Date();
  footers: FooterItem[] = [
    {
      type: _('COMMON.RESOURCES'),
      links: [
        {
          name: _('COMMON.CONTACT_US'),
          link: '/contact/us',
          icon: 'at',
        },
        {
          name: _('COMMON.BLOG'),
          link: '/blog',
          icon: 'rss-box',
        },
      ],
    },
    {
      type: _('COMMON.SOCIAL'),
      links: [
        {
          name: _('SOCIAL.FACEBOOK'),
          link: 'https://facebook.com',
          external: true,
          icon: 'facebook',
        },
        {
          name: _('SOCIAL.TWITTER'),
          link: 'https://twitter.com',
          external: true,
          icon: 'twitter',
        },
      ],
    },
    {
      type: _('COMMON.COMPANY'),
      links: [
        {
          name: _('COMMON.TERMS_CONDITIONS'),
          link: '/terms',
          icon: 'clipboard-text-outline',
        },
        {
          name: _('COMMON.PRIVACY'),
          link: '/privacy',
          icon: 'clipboard-text-outline',
        },
      ],
    },
  ];
}
