import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* 服务注入 */
import { SystemService } from 'src/app/core/services/system/system.service';
// 鉴权服务
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class RequestProcessedHandler {

  constructor(
    private systemService: SystemService,
    private authService: AuthService
  ) {}

  handle(req: HttpResponse<any>): any {
    // return req;
    if (req.body && req.body.reCode === 'SUCCESS') {
      console.log('成功请求...');
      return req;
    } else if (req.body && req.body.reCode) {
      switch ((req.body.reCode).toUpperCase()) {
        case 'TOKEN_NOT_EXISTS':
        case 'ACCESS_TOKEN_INVALID':
          this.systemService.presentToast('登录失效');
          // localStorage.removeItem('wxAppToken');
          this.authService.logout();
          this.authService.openLogin();
          throw {msg: req.body.reMsg};
        /* TOKEN 过期重新拉取TOKEN */
        case 'TOKEN_EXPIRE':
          this.authService.refreshToken();
          throw {msg: req.body.reMsg};
        case 'X1021':
          this.systemService.presentToast(req.body.reMsg);
          throw {msg: req.body.reMsg};
        case 'X':
          throw {msg: req.body.reMsg};
      }
      console.log('失败请求...');
      this.systemService.presentToast(req.body.reMsg);
      // return throwError(new Error(req.body.reMsg));
      throw {msg: req.body.reMsg};
    } else {
      localStorage.removeItem('token');
      throw {msg: '请求错误'};
    }
  }

}
