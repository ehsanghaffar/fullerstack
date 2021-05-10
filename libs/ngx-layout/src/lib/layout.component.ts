import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { fadeAnimations, routeAnimations } from '@fullerstack/ngx-animation';
import { I18nService } from '@fullerstack/ngx-i18n';
import { LoggerService } from '@fullerstack/ngx-logger';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LayoutService } from './layout.service';

@Component({
  selector: 'fullerstack-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimations.slideIn, fadeAnimations.fadeOutInSlow],
})
export class LayoutComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('sideMenu')
  private sideMenu: MatSidenav;
  @ViewChild('notifyMenu')
  private notifyMenu: MatSidenav;
  private destroy$ = new Subject<boolean>();

  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    public logger: LoggerService,
    public i18n: I18nService,
    public layout: LayoutService
  ) {}

  ngOnInit() {
    this.layout.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (state.menuOpen) {
        this.sideMenu.open();
      } else {
        this.sideMenu.close();
      }
      if (state.notifyOpen) {
        this.notifyMenu.open();
      } else {
        this.notifyMenu.close();
      }
    });
  }

  ngAfterViewInit(): void {
    this.sideMenu.closedStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.layout.state.menuOpen) {
        this.layout.toggleMenu();
      }
    });
    this.notifyMenu.closedStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.layout.state.notifyOpen) {
        this.layout.toggleNotification();
      }
    });
  }

  routeState(outlet: RouterOutlet) {
    const animationsEnabled = false;
    if (animationsEnabled) {
      return outlet.activatedRouteData.title || 'unknown';
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.logger.info('LayoutComponent destroyed ...');
  }
}
