import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable()
export class MaterialService {
  constructor(
    readonly registry: MatIconRegistry,
    readonly sanitizer: DomSanitizer
  ) {}

  /**
   * Loads icons with namespace
   * @param iconList list of icons
   */
  registerSvgIconsInNamespace(iconList, cacheBustingHash = null) {
    // [
    //   ...
    //   {
    //     names: ['ca', 'CA'],
    //     namespace: 'flags',
    //     path: 'assets/images/svg/flags/ca.svg'
    //   },
    // ]

    iconList.forEach((icon) => {
      const path = cacheBustingHash
        ? `${icon.path}?${cacheBustingHash}`
        : icon.path;
      const securePath = this.sanitizer.bypassSecurityTrustResourceUrl(path);
      icon.names.forEach((name) => {
        this.registry.addSvgIconInNamespace(icon.namespace, name, securePath);
      });
    });
  }

  /**
   * Loads icons set with no namespace
   * @param iconPath path to icon set (ex: '/assets/fonts/mdi.svg')
   */
  registerSvgIconSet(iconPath: string, cacheBustingHash = null) {
    const path = cacheBustingHash
      ? `${iconPath}?${cacheBustingHash}`
      : iconPath;
    const securePath = this.sanitizer.bypassSecurityTrustResourceUrl(iconPath);
    this.registry.addSvgIconSet(securePath);
  }

  /**
   * Register font alias
   * @param font, alias (ex: 'fontawesome', 'fa')
   */
  registerFontClassAlias(font: string, alias: string) {
    this.registry.registerFontClassAlias(font, alias);
  }
}
