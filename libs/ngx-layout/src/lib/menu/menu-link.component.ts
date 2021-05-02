import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MenuNode } from '@fullerstack/ngx-menu';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'fullerstack-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLinkComponent {
  @Input() link: MenuNode = null;

  constructor(readonly router: Router, readonly layout: LayoutService) {}

  redirectUrl(node: MenuNode) {
    if (node.isFullSpan && this.layout.state.menuOpen) {
      this.layout.toggleMenu();
    }
    this.router.navigate([node.link]);
  }
}