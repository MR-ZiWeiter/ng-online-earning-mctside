import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from './../index.d';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable()

export class UserAccountService {
  constructor(
    private http: HttpService,
    private userService: UserService
  ) {}

  // 登录注册
  asyncAccountLoginRegister(info: any): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.post('/login', info, {}, {}).subscribe((res: any) => {
        this.userService.setAppToken(res.rel);
        observer.next(res);
      }, (err: any) => {
        console.log(err);
        observer.error(false);
      });
    });
  }
  // 注销账户
  asyncAccountLogoutOff(info: any): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.post('/logout', info, {}, info).subscribe((res: any) => {
        this.userService.setAppToken(null);
        observer.next(res);
      }, (err: any) => {
        console.log(err);
        observer.error(false);
      });
    });
  }
}
