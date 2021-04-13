import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class ApiFinancialService {
  constructor(
    private http: HttpService
  ) {}

  // 充值明细
  asyncFetchFinancialCapitalRechargeList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/business/capital-account/recharge/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  // 资金明细
  asyncFetchFinancialCapitalList(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/business/capital-account/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
}
