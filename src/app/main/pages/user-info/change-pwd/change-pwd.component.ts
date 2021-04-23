import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { SystemService } from 'src/app/core/services/system/system.service';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'swipe-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  public selectedValue = null;

  public validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  public basicInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private userService: UserService,
    private apiUserAccountService: ApiUserAccountService
  ) {
    this.userService.getUserBasicInfo().subscribe(renderInfo => {
      // console.log(renderInfo)
      if (renderInfo) {
        this.basicInfo = renderInfo;
      }
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.apiUserAccountService.asyncFetchAccountPwdChange(this.validateForm.value).subscribe(res => {
        this.systemService.presentToast('修改成功', 'success');
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newCredential.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      accountType: [3],
      identifier: [null, [Validators.required]],
      credential: [null, [Validators.required]],
      newCredential: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      imageCode: [null, [Validators.required]],
      imageCodeToken: [null, [Validators.required]],
    });
  }
}
