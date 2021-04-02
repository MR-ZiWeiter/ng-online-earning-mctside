import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token!: string|null;
  public userBasicInfo!: any;

  private $WxAppToken: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);

  private $userBasicInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // 初始化时获取TOken
  constructor() {
    this.getToken();
    this.setAppToken(this.token);
  }
  // 获取用户基本信息数据
  public getUserBasicInfo(): Observable<any> {
    return this.$userBasicInfo.asObservable();
  }
  // Token监听处理
  public getWxAppToken(): Observable<string|null> {
    return this.$WxAppToken.asObservable();
  }

  // 获取缓存中数据
  public getToken(): string|null {
    return this.token = localStorage.getItem('wxAppToken');
  }

  // 设置Token
  public setToken(token: string|null): void {
    this.token = token;
    localStorage.setItem('wxAppToken', token || '');
    console.log('我正在设置token');
    if (!this.token) {
      localStorage.removeItem('wxAppToken');
      console.log('触发token为空，已清除token记录');
    }
  }

  // 暴露更新用户信息方法
  public setUserBasicInfo(info: object|null): void {
    console.log('正在设置用户信息');
    this.userBasicInfo = info;
    this.$userBasicInfo.next(info);
  }

  // 暴露更新Tokeo方法
  public setAppToken(info: string|null): void {
    this.setToken(info);
    this.$WxAppToken.next(info);
  }

}
