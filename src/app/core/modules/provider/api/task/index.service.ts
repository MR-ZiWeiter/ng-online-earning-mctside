import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiTaskIndexService {

  constructor(
    private http: HttpService
  ) {}

  /* 基础服务费 */
  asyncFetchTaskBasePrice(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/capital/service/base', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 增值服务费 */
  asyncFetchTaskAdditionalPrice(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/capital/service/additional', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 任务列表 */
  asyncFetchTaskList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 订单列表 */
  asyncFetchOrderList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/order/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
