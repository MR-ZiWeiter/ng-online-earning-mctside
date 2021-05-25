import { CheckInfoComponent } from './check-info/check-info.component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { OrderInfoComponent } from './order-info/order-info.component';

@Component({
  selector: 'swipe-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 5,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private apiTaskIndexService: ApiTaskIndexService,
  ) {}

  public fetchOrderList() {
    this.renderConfig.loading = true;
    this.apiTaskIndexService.asyncFetchOrderList({
      ...this.renderConfig,
      ...this.validateForm.value
    }).subscribe(res => {
      this.renderArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    })
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.fetchOrderList();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      checkType: [1],
      checkValue: [''],
    });
    this.fetchOrderList();
  }

  public onPageIndexChange(ev: number) {
    // console.log(ev);
    this.renderConfig.pageNum = ev;
    this.fetchOrderList();
  }
  public onPageSizeChange(ev: number) {
    // console.log(ev);
    this.renderConfig.pageSize = ev;
    this.fetchOrderList();
  }

  /* 打开详情弹窗 */
  public openOrderDetail(renderInfo: any) {
    this.nzModalService.create({
      nzContent: OrderInfoComponent,
      nzWidth: 800,
      nzTitle: '订单详情',
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzFooter: null,
      nzComponentParams: {
        renderInfo
      },
      nzOnCancel: (e: any) => {
        console.log(e)
      },
      nzOnOk: (e: any) => {
        console.log(e)
      }
    })
  }

  /* 核对订单 */
  public openCheckInfo(renderInfo: any) {
    const modal = this.nzModalService.create({
      nzContent: CheckInfoComponent,
      nzWidth: 800,
      nzTitle: '核对订单',
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzFooter: null,
      nzComponentParams: {
        renderInfo
      },
      nzOnCancel: (e: any) => {
        console.log(e)
      },
      nzOnOk: (e: any) => {
        console.log(e)
      }
    })
    modal.afterClose.subscribe(() => {
      // console.log(res);
      this.fetchOrderList();
    })
  }
}
