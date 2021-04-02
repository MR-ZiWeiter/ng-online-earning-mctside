import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private messageController: NzMessageService,
  ) { }

  async presentToast(content: string, type: 'error'|'success'|'info'|'warning'|'loading' = 'error', options: {nzDuration?: number; nzPauseOnHover?: boolean; nzAnimate?: boolean} = {}) {
    this.messageController[type](content, {
      nzDuration: 2000,
      ...options
    });
  }

}
