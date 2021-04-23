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
    params = request.params.append('client', 'mctside');
    // console.log(request);
    if (request.method === 'POST') {
      // console.log(request.params.get('noHeader'));
      /* 处理多类数据时头部是否携带请求头问题 */
      let noHeader;
      if (request.body instanceof FormData) {
        noHeader = request.body.get('noHeader');
      } else if (request.body instanceof Object) {
        noHeader = request.body.noHeader;
      }
      if (request.params) {
        noHeader = request.params.get('noHeader') || noHeader
      }
      /* END */
      if (!noHeader) {
        if (!request.headers.has('Content-Type')) {
          (headers as any)['Content-Type'] = 'application/json';
        }
      }
    }
    const cloneHttpRequest = request.clone({
      setHeaders: {
        accessToken: this.getToken(),
        client: 'mctside',
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
