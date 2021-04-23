import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiFinancialAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'swipe-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  public selectedValue = null;

  public validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  private _renderInfo: any = {};

  @Input()
  public set renderInfo(n: any) {
    if (n) {
      this._renderInfo = n;
      setTimeout(() => {
        /* 赋值提交数据 */
        this.validateForm.controls['payAccountId'].setValue(n.id);
      }, 300)
    }
  }
  public get renderInfo() {
    return this._renderInfo;
  }

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
      this.apiFinancialAccountService.asyncFetchFinancialAccountPayCashOutInfo(this.validateForm.value).subscribe(res => {
        this.systemService.presentToast('提交提现申请成功，将会在3个工作日到账', 'success');
        this.validateForm.controls['amount'].reset();
      })
    } else {
      this.systemService.presentToast('请输入正确的提现金额', 'error');
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      amount: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      payAccountId: [null, [Validators.required]]
    });
  }

}
