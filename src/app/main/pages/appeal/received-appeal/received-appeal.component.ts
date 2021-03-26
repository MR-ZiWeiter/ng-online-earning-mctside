import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppealModalComponent } from './appeal-modal/appeal-modal.component';

@Component({
  selector: 'swipe-received-appeal',
  templateUrl: './received-appeal.component.html',
  styleUrls: ['./received-appeal.component.scss']
})
export class ReceivedAppealComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet = [
    {
      code: '055804',
      type: '支付宝',
      price: '724750',
      time: '1977/02/11 13:25:56',
      over: '724750',
      status: '等待充值'
    },
    {
      code: '055804',
      type: '支付宝',
      price: '724750',
      time: '1977/02/11 13:25:56',
      over: '724750',
      status: '等待充值'
    },
    {
      code: '055804',
      type: '支付宝',
      price: '724750',
      time: '1977/02/11 13:25:56',
      over: '724750',
      status: '等待充值'
    },
    {
      code: '055804',
      type: '支付宝',
      price: '724750',
      time: '1977/02/11 13:25:56',
      over: '724750',
      status: '等待充值'
    }
  ];

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
  public openAppealDetail() {
    this.nzModalService.create({
      nzContent: AppealModalComponent,
      nzWidth: 657,
      nzTitle: '我收到的申诉',
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
