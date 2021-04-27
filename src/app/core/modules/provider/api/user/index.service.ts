import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// 数据类型
import { ApiResponseModel } from '../index.d';

import { HttpService } from '../../http/http.service';
// 注入中间件 用户信息
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable()

export class ApiUserIndexService {
  constructor(private http: HttpService, private userService: UserService) {}

  // 获取用户基本信息
  asyncFetchBasicInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/account-privacy/get', info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        this.userService.setUserBasicInfo(res.rel);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 个人主页信息
  asyncFetchUserHomeInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/account-privacy/index', info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 保存个人信息 */
  asyncFetchUserBisicUpdate(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/account-privacy/save', info, {}, info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 获取统计信息 */
  asyncFetchUserCount(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/account-privacy/count', info).subscribe((res: ApiResponseModel) => {
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

}
