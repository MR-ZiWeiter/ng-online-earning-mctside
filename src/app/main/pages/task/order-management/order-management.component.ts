import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderInfoComponent } from './order-info/order-info.component';

@Component({
  selector: 'swipe-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  public validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nzModalService: NzModalService
  ) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      taskType: [null, [Validators.required]]
    });
  }

  /* 打开详情弹窗 */
  public openOrderDetail() {
    this.nzModalService.create({
      nzContent: OrderInfoComponent,
      nzTitle: '订单详情',
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzFooter: null,
      nzOnCancel: (e: any) => {
        console.log(e)
      },
      nzOnOk: (e: any) => {
        console.log(e)
      }
    })
  }
}
