import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})

export class ApiFinancialAccountService {
  constructor(
    private http: HttpService
  ) {}

  // 充值申请
  asyncFetchFinancialAccountRecharge(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.post('/business/capital-account/recharge', info, {}, info).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  /* 充值配置 */
  asyncFetchFinancialAccountInfo(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/business/capital-account/recharge-account/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  /* 提现配置 收款账户 */
  asyncFetchFinancialAccountPayInfo(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.get('/business/capital-account/pay-account/list', info, {}).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }

  /* 提现申请 */
  asyncFetchFinancialAccountPayCashOutInfo(info: any = {}): Observable<any> {
    return new Observable((observer: { next: (arg0: any) => void; error: (arg0: boolean) => void; }) => {
      this.http.post('/business/capital-account/cash-out', info, {}, info).subscribe((res: any) => {
        // console.log(res);
        observer.next(res);
      }, (err: any) => {
        observer.error(false);
      });
    });
  }
}
