import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from './../../logger/logger.service';

import { UserService } from 'src/app/core/services/user/user.service';
@Injectable()

export class RequestPreviewHandler {
  constructor(
    public logger: LoggerService,
    public userService: UserService
  ) {}

  handle(request: HttpRequest<any>): HttpRequest<any> {
    let params = new HttpParams();
    const headers = {};
    params = request.params.append('client', 'wx');
    console.log(request);
    if (request.method === 'POST') {
      console.log(request.params.get('noHeader'));
      if (!request.params.get('noHeader')) {
        if (!request.headers.has('Content-Type')) {
          (headers as any)['Content-Type'] = 'application/json';
        }
      }
    }
    const cloneHttpRequest = request.clone({
      setHeaders: {
        token: this.getToken(),
        client: 'wx',
        ...headers
      },
      params
    });
    // console.log(cloneHttpRequest);
    // const customHeader = new HttpHeaders();
    // customHeader.append('token', this.getToken());
    // this.logger.warn('未注入自定义请求前置处理类，使用默认前置处理 -- preview');
    // cloneHttpRequest.headers.set('token', this.getToken());
    // cloneHttpRequest.params.set('client', 'wx');
    return cloneHttpRequest;
  }

  getToken(): string {
    return this.userService.getToken() || '';
  }
}
