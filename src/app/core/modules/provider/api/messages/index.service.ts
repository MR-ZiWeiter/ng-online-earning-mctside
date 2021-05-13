import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class ApiMessagesService {
  constructor(
    private http: HttpService
  ) {}

  // 消息列表
  asyncFetchMessagesList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/business/message/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
  // 删除消息
  asyncDeleteMessagesInfo(info: any = null): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.delete(`/business/message/delete/${info}`, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
  // 消息列表
  asyncUpdateMessagesInfo(info: any = null): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.put(`/business/message/read/${info}`, info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

}
