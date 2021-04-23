import { ApiFinancialAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'swipe-account-withdrawal',
  templateUrl: './account-withdrawal.component.html',
  styleUrls: ['./account-withdrawal.component.scss']
})
export class AccountWithdrawalComponent implements OnInit {

  public selectedValue = null;

  public validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  public renderInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private userService: UserService,
    private apiFinancialAccountService: ApiFinancialAccountService
  ) {
    this.fetchRenderInfo();
    this.userService.getUserBasicInfo().subscribe(renderInfo => {
      console.log(renderInfo)
    })
  }

  /* 获取配置数据 */
  private fetchRenderInfo() {
    this.apiFinancialAccountService.asyncFetchFinancialAccountPayInfo().subscribe(res => {
      this.renderInfo = res.rel;
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
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
      temp: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      paytype: ['1', [Validators.required]],
      norm: [null],
      price: [null, [Validators.pattern(/^\d+(\.\d+)?$/)]],
      agree: [false]
    });
  }
  /* 选择支付类别 */
  public selectPayTypeChange(ev: any) {
    // console.log(ev)
  }

}
