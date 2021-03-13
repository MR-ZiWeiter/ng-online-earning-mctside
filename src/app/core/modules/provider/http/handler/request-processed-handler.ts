import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* 组件注入 */
import { NzMessageService } from 'ng-zorro-antd/message';
// 鉴权服务
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class RequestProcessedHandler {

  constructor(
    private toastController: NzMessageService,
    private authService: AuthService
  ) {}

  handle(req: HttpResponse<any>): any {
    // return req;
    if (req.body && req.body.reCode === 'X0000') {
      console.log('成功请求...');
      return req;
    } else if (req.body && req.body.reCode) {
      switch (req.body.reCode) {
        case 'X1003':
        case 'X1004':
        case 'X1007':
        case 'X0007':
          this.presentToast('登录失效');
          localStorage.removeItem('wxAppToken');
          this.authService.openLogin();
          throw {msg: req.body.reMsg};
        case 'X1021':
          this.presentToast(req.body.reMsg);
          throw {msg: req.body.reMsg};
        case 'X':
          throw {msg: req.body.reMsg};
      }
      console.log('失败请求...');
      this.presentToast(req.body.reMsg);
      // return throwError(new Error(req.body.reMsg));
      throw {msg: req.body.reMsg};
    } else {
      localStorage.removeItem('token');
      throw {msg: '请求错误'};
    }
  }

  async presentToast(content: string) {
    this.toastController.error(content, {
      nzDuration: 2000
    });
  }
}
