import { NzModalService } from 'ng-zorro-antd/modal';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-check-info',
  templateUrl: './check-info.component.html',
  styleUrls: ['./check-info.component.scss']
})
export class CheckInfoComponent implements OnInit {

  public orderInfo: any = null;

  private _renderInfo: any = {};

  @Input()
  public set renderInfo(n: any) {
    this._renderInfo = n;
    if (n) {
      this.initalOrderInfo(n.id);
    }
  }
  public get renderInfo() {
    return this._renderInfo;
  }

  constructor(
    private router: Router,
    private systemService: SystemService,
    private nzModalService: NzModalService,
    private apiTaskIndexService: ApiTaskIndexService
  ) { }

  ngOnInit() {}

  private initalOrderInfo(taskId: string) {
    this.apiTaskIndexService.asyncFetchCheckInfo({taskId}).subscribe(res => {
      this.orderInfo = res.rel;
    })
  }


  /*  确认通过 */
  public openConfirmInfo() {
    this.apiTaskIndexService.asyncFetchCheckPassInfo({
      taskId: this._renderInfo.id
    }).subscribe(res => {
      this.systemService.presentToast('核对通过', 'success');
      this.nzModalService.closeAll();
    })
  }

  /* 跳转申诉页面 */
  public openAppealInfo() {
    this.router.navigate(['/main/appeal/new-appeal', { orderNO: this.orderInfo.orderNo }]);
    this.nzModalService.closeAll();
  }
}
