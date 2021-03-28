/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { merge as ldNestedMerge } from 'lodash-es';
import { CfgService, ApplicationCfg } from '@fullerstack/ngx-cfg';
import { LogLevels, LogNames, LogColors } from './logger.models';
import { DefaultLoggerCfg } from './logger.defaults';

/**
 * An injectable class that handles logging service
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isPlatformIE = false;
  private _options: Readonly<ApplicationCfg>;

  constructor(public cfg: CfgService) {
    this._options = ldNestedMerge(DefaultLoggerCfg, cfg.options);
    if (!this.options.production) {
      this.info('LogService ready ...');
    }
  }

  get options(): Readonly<ApplicationCfg> {
    return this._options;
  }

  /**
   * Handles mission critical logs
   * @param message logging message
   * @param extras extra messages
   */
  critical(message, ...extras: any[]) {
    this.doLog(LogLevels.critical, message, extras);
  }

  /**
   * Handles system error logs
   * @param message logging message
   * @param extras extra messages
   */
  error(message, ...extras: any[]) {
    this.doLog(LogLevels.error, message, extras);
  }

  /**
   * Handles warning logs
   * @param message logging message
   * @param extras extra messages
   */
  warn(message, ...extras: any[]) {
    this.doLog(LogLevels.warn, message, extras);
  }

  /**
   * Handles info logs
   * @param message logging message
   * @param extras extra messages
   */
  info(message, ...extras: any[]) {
    this.doLog(LogLevels.info, message, extras);
  }

  /**
   * Handles debugging logs
   * @param message logging message
   * @param extras extra messages
   */
  debug(message, ...extras: any[]) {
    this.doLog(LogLevels.debug, message, extras);
  }

  /**
   * Handles trace logs
   * @param message logging message
   * @param extras extra messages
   */
  trace(message, ...extras: any[]) {
    this.doLog(LogLevels.trace, message, extras);
  }

  /**
   * Returns current time in ISO format (2018-03-04T22:46:09.346Z)
   */
  private get time() {
    return new Date().toISOString();
  }

  /**
   * Handles the platform logging
   * @param level logging level
   * @param message logging message
   * @param extras extra message
   */
  private doLog(level: LogLevels, message: any, extras: any[] = []) {
    if (
      !message ||
      level === LogLevels.none ||
      level > this._options.logger.level ||
      this._options.logger.level === LogLevels.none
    ) {
      return;
    }

    const color = LogColors[level];
    console.log(
      `%c${this.time} [${LogNames[level]}]`,
      `color:${color}`,
      message,
      ...extras
    );
  }
}