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
      this.http.get('/service/user/getUserBasicInfo', info).subscribe((res: ApiResponseModel) => {
        console.log(res);
        this.userService.setUserBasicInfo(res.rel);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 保存反馈意见
  asyncPostFeedback(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/saveFeedback', {}, {
        // 'Content-Type': 'application/json'
      }, info).subscribe((res: ApiResponseModel) => {
        console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 消息列表
  asyncFetchNotificationInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/tourSysMsg/getMsgList', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 我的喜欢列表
  asyncFetchMyLoveInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/user/getRecentLike', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 删除我的喜欢
  asyncDeleteMyLoveInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/user/deleteRecentLike', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

}
