import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { ApiResponseModel } from '../index.d';

@Injectable({
  providedIn: 'root'
})
export class ApiReleaseService {

  constructor(
    private http: HttpService
  ) { }

  /* 模板字典 */
  asyncFetchTempDictList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/templates_dict', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  // 模板列表
  asyncFetchTempList(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/template/list', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 通过模板ID获取模板详情 */
  asyncFetchTempIdToInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/templates', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 商家要求条款 */
  asyncFetchTaskConfigInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/requires_item', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 购物标签 */
  asyncFetchTaskLabelsInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get('/business/task/labels', info, {}).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }

  /* 发布任务 */
  asyncPostMewTaskInfo(info: any = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post('/business/task/add', {}, {}, info).subscribe((res: ApiResponseModel) => {
        // console.log(res);
        observer.next(res);
      }, err => {
        observer.error(false);
      });
    });
  }
}
