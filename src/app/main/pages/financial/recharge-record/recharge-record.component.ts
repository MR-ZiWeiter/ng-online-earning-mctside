import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiFinancialService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-recharge-record',
  templateUrl: './recharge-record.component.html',
  styleUrls: ['./recharge-record.component.scss']
})
export class RechargeRecordComponent implements OnInit {

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

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 20
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiFinancialService: ApiFinancialService
  ) {
    this.fetchFinancialCapitalRechargeList();
  }

  public fetchFinancialCapitalRechargeList() {
    this.apiFinancialService.asyncFetchFinancialCapitalRechargeList(this.renderConfig).subscribe(res => {
      this.renderArray = res.rel.list
    })
  }

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
