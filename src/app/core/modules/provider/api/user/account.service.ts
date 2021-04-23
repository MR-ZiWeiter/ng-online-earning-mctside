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
  // 注册验证码获取
  asyncFetchAccountRegisterCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/open/sms/code/register', info, {}).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 获取修改手机号验证码
  asyncFetchAccountLoginRegisterCode(info: any): Observable<any> {
    return new Observable(observer => {
      this.http.get('/open/sms/code/change/mobile', info, {}).subscribe((res: ApiResponseModel) => {
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
}
