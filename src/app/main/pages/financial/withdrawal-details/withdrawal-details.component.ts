import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-withdrawal-details',
  templateUrl: './withdrawal-details.component.html',
  styleUrls: ['./withdrawal-details.component.scss']
})
export class WithdrawalDetailsComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet = [
    {
      code: '055804',
      name: '司马余强',
      type: '支付宝',
      acount: '17279948119',
      withdrawalPrice: '31',
      price: '724750',
      time: '1977/02/11 13:25:56',
      status: '等待充值',
      remark: '湖南省'
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

  constructor(private fb: FormBuilder) {}

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

}
