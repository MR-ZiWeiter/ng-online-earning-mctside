import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from './../index.d';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable()

export class ApiUserAccountService {
  constructor(
    private http: HttpService,
    private userService: UserService
  ) {}

  // 登录
  asyncAccountLogin(info: LoginForm): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/login/in', {}, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注册
  asyncAccountRegister(info: RegisterForm): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/register', {}, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 刷新TOKEN
  asyncAccountRefreshToken(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/login/token/refresh', info, {}, info).subscribe((res: ApiResponseModel) => {
        this.userService.setAppToken(res.rel.token);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 验证码获取
  asyncFetchAccountSmsCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/open/sms/code/sms', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 修改手机号
  asyncFetchAccountPwdChange(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/pwd/change', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  /* 更新头像 */
  asyncFetchAccountAvatarChange(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.put('/business/account-privacy/update/avatar', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }

  /* 获取商家认证信息 */
  asyncFetchAccountIdentityInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/identity-auth/identity/get', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }


  /* 保存身份证信息 */
  asyncUpdateAccountIdCardInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/identity-auth/id-card/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  /* 保存支付宝信息 */
  asyncUpdateAccountAlipayInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/identity-auth/ali-pay/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  /* 保存微信信息 */
  asyncUpdateAccountWechatInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/identity-auth/we-chat/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  /* 保存身份证信息 */
  asyncUpdateAccountBankInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/identity-auth/bank-card/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  /* 保存手机信息 */
  asyncUpdateAccountPhoneInfo(info?: any): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/identity-auth/phone/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
}
