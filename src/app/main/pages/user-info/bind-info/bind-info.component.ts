import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-bind-info',
  templateUrl: './bind-info.component.html',
  styleUrls: ['./bind-info.component.scss'],
})
export class BindInfoComponent implements OnInit {
  public radioValue = 'A';
  public renderInfo: any = {};
  constructor(
    private apiUserAccountService: ApiUserAccountService
  ) {}

  ngOnInit() {
    this.reloadRenderInfo();
  }

  /* 刷新信息 */
  public reloadRenderInfo() {
    this.apiUserAccountService.asyncFetchAccountIdentityInfo().subscribe(renderInfo => {
      // console.log(renderInfo)
      this.renderInfo = renderInfo.rel;
    })
  }

  /* 切换卡片组件 */
  public switchInfo(info: any) {
    // console.log(info);
    this.radioValue = info.value;
  }
}
