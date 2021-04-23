import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IAliossConfigModel } from 'src/app/core/model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private $aliossConfig: BehaviorSubject<IAliossConfigModel|null> = new BehaviorSubject<IAliossConfigModel|null>(null);

  constructor(
    private messageController: NzMessageService,
  ) { }

  async presentToast(content: string, type: 'error'|'success'|'info'|'warning'|'loading' = 'error', options: {nzDuration?: number; nzPauseOnHover?: boolean; nzAnimate?: boolean} = {}) {
    this.messageController[type](content, {
      nzDuration: 2000,
      ...options
    });
  }

  public getAliossConfig(): Observable<IAliossConfigModel|null> {
    return this.$aliossConfig.asObservable();
  }

  public setAliossConfig(info: IAliossConfigModel) {
    this.$aliossConfig.next(info);
  }

}
