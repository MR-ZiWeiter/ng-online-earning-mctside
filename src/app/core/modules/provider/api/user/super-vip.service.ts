import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})

export class ApiSuperVipService {
  constructor(
    private http: HttpService
  ) {}

  // 获取VIP套餐
  asyncFetchSuperVipInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/order/getPackage', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 购买VIP
  asyncPostBuySuperVip(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/service/order/rent', {}, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 获取已购订单列表
  asyncFetchHistorySuperVipInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/service/order/getOrderList', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
