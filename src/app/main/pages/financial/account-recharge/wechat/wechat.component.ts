import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiFinancialAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'swipe-wechat',
  templateUrl: './wechat.component.html',
  styleUrls: ['./wechat.component.scss']
})
export class WechatComponent implements OnInit {

  public validateForm!: FormGroup;

  @Input() public renderInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private apiFinancialAccountService: ApiFinancialAccountService
  ) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.apiFinancialAccountService.asyncFetchFinancialAccountRecharge(this.validateForm.value).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast
        ('提交成功，将会在3个工作日内为您进行核验', 'success');
        this.validateForm.reset();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'warning');
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      rechargeMethod: ['wechat_pay', [Validators.required]],
      outTradeNo: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      amount: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]]
    });
  }

}
