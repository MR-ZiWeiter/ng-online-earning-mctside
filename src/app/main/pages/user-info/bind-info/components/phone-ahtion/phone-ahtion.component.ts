import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-phone-ahtion',
  templateUrl: './phone-ahtion.component.html',
  styleUrls: ['./phone-ahtion.component.scss']
})
export class PhoneAhtionComponent implements OnInit {
  public validateForm!: FormGroup;
  public refCode: any = {
    isCode: false,
    timer: 0,
    code: 60
  };
  public _renderInfo: any;
  @Input()
  public set renderInfo(n: any) {
    this._renderInfo = n;
  }
  public get renderInfo() {
    return this._renderInfo;
  }
  @Output() private reloadChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private apiUserAccountService: ApiUserAccountService,
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.renderInfo) {
      this.validateForm = this.fb.group({
        mobile: [this.renderInfo.mobile || null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$/)]],
        smsCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      });
    } else {
      this.validateForm = this.fb.group({
        mobile: [null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$/)]],
        smsCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      });
    }
  }
  public openFetchCodeChange() {
    if (this.validateForm.controls['mobile'].valid) {
      this.apiUserAccountService.asyncFetchAccountSmsCode(this.validateForm.value).subscribe(res => {
        this.systemService.presentToast('发送短信成功，请注意查收', 'success');
        this.setTimerInfo();
      });
    } else {
      this.systemService.presentToast('请输入正确的手机号', 'error');
    }
  }
  private setTimerInfo() {
    this.refCode.code = 60;
    this.refCode.isCode = true;
    this.refCode.timer && clearInterval(this.refCode.timer);
    this.refCode.timer = setInterval(() => {
      this.refCode.code--;
      if (this.refCode.code === 0) {
        clearInterval(this.refCode.timer);
        this.refCode.isCode = false;
      }
    }, 1000)
  }
  public submitForm(): void {
    // tslint:disable-next-line:forin
    // 账户密码登录

    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.validateForm);
    if (this.validateForm.valid) {
      this.apiUserAccountService.asyncUpdateAccountPhoneInfo(this.validateForm.value).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast('保存手机信息成功!', 'success');
        this.reloadChange.emit();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }

}
