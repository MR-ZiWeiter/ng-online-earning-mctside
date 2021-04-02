import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiMerchantService {

constructor(
  private http: HttpService
) { }

  // 电商平台类别
  asyncFetchPlatformListInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/common/platform/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 绑定商铺
  asyncFetchBindShopInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/shops/add', info, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

}
