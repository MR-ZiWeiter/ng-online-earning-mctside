import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { SystemService } from 'src/app/core/services/system/system.service';

@Injectable({
  providedIn: 'root'
})

export class ApiSystemService {
  constructor(
    private http: HttpService,
    private systemService: SystemService
  ) {}

  // 获取OSS临时认证凭证
  asyncFetchSystemAliossSecretKeys(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/common/alists', info, {}).subscribe((res: any) => {
        // console.log(res);
        this.systemService.setAliossConfig(res.rel);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  // 获取本地城市信息
  asyncFetchSystemCityList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('assets/json/city.json', info, {isLocal: true}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  /* 查询银行卡信息列表 */
  asyncFetchSystemBankList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/common/bank/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
}
