import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiFinancialAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'swipe-wechat',
  templateUrl: './wechat.component.html',
  styleUrls: ['./wechat.component.scss']
})
export class WechatComponent implements OnInit {

  public selectedValue = null;

  public validateForm!: FormGroup;
  private _renderInfo: any = {};

  @Input()
  public set renderInfo(n: any) {
    if (n) {
      this._renderInfo = n;
      setTimeout(() => {
        /* 赋值提交数据 */
        this.validateForm.controls['payAccountId'].setValue(n.id);
        this.validateForm.controls['qrCodeImage'].setValue(n.qrCodeImage);
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
      payAccountId: [null, [Validators.required]],
      qrCodeImage: [null]
    });
  }

}
