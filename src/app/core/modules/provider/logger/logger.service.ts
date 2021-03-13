import { Injectable } from '@angular/core';
import { LogLevel } from './logger-type';
import { environment } from '@app/env';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  constructor() { }
  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  public log(...objects: any[]) {
    this.log_real(console.log, LogLevel.Debug, objects);
  }

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.debug().
   */
  public debug(...objects: any[]) {
    this.log_real(console.log, LogLevel.Debug, objects);
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.info().
   */
  public info(...objects: any[]) {
    // tslint:disable-next-line: no-console
    this.log_real(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.warn().
   */
  public warn(...objects: any[]) {
    this.log_real(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.error().
   */
  public error(...objects: any[]) {
    this.log_real(console.error, LogLevel.Error, objects);
  }

  protected async log_real(func: () => void, level: LogLevel, objects: any) {
    // console.log(process);
    const env = environment.ENVIRONMENT || 'development';
    if (env !== 'production') {
      func.apply(console, objects);
    }
  }
}
