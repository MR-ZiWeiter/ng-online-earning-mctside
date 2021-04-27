import { Component, Input, OnInit } from '@angular/core';
import { CoreToolsFunction } from 'src/app/core/core.tools';

@Component({
  selector: 'swipe-task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.scss']
})
export class TaskWindowComponent extends CoreToolsFunction implements OnInit {

  /* 统计数据 */
  public taskInfo: any = {};

  /* 初始数据 */
  private _renderInfo: any[] = [];

  @Input()
  public set renderInfo(n: any[]) {
    this._renderInfo = n;
    this.handlerRenderInfo(n);
  }
  public get renderInfo(): any[] {
    return this._renderInfo;
  }

  constructor() {
    super();
  }

  private handlerRenderInfo(renderObject: any) {
    let submitForm: any = {};
    for(const key in renderObject) {
      // Object.assign(submitForm, renderObject[key]);
      submitForm = this.deepFusinObject(submitForm, renderObject[key]);
    }
    if (!Object.keys(submitForm).length) {
      return;
    }
    let commission = 0;
    submitForm.requiresForms && submitForm.requiresForms.map((item: any) => {
      switch(item.tagType) {
        case 2:
        case 3:
          item.requiresRuleItemVos.some((childItem: any) => {
            if (childItem.id === item.selected) {
              commission += childItem.fees
              return true
            }
            return false
          })
          break;
        case 4:
          item.requiresRuleItemVos.map((childItem: any) => {
            if (item.selected.include(childItem.id)) {
              commission += childItem.fees
            }
          })
          break;
      }
    })
    if (submitForm.baseFess) {
      this.taskInfo.baseFess = submitForm.baseFess || 0;
    }
    if (submitForm.goodsForm) {
      this.taskInfo.commodityFess = submitForm.goodsForm.unitPrice * submitForm.goodsForm.quantity || 0;
    }
    this.taskInfo.valueAdded = commission || 0;
    if (submitForm.superaddFees) {
      this.taskInfo.superaddFees = submitForm.superaddFees || 0;
    }
    if (submitForm.businessTaskOriginalBaseForm) {
      this.taskInfo.taskQuantity = submitForm.businessTaskOriginalBaseForm.taskQuantity || 0;
    }
    // console.log(commission)
    this.taskInfo.commission = (commission + (this.taskInfo.commodityFess || 0) * 100 + (this.taskInfo.baseFess || 0) + (this.taskInfo.superaddFees || 0) * 100) * (this.taskInfo.taskQuantity || 0);
  }

  ngOnInit() {

  }

}
