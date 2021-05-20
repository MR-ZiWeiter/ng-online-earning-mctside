import { SystemService } from 'src/app/core/services/system/system.service';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-real-name-ahtion',
  templateUrl: './real-name-ahtion.component.html',
  styleUrls: ['./real-name-ahtion.component.scss']
})
export class RealNameAhtionComponent implements OnInit {

  public validateForm!: FormGroup;
  public _renderInfo: any;
  @Input()
  public set renderInfo(n: any) {
    // console.log(n)
    this._renderInfo = n;
  }
  public get renderInfo() {
    return this._renderInfo;
  }
  @Output() private reloadChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private apiUserAccountService: ApiUserAccountService
  ) { }

  ngOnInit() {
    if (this.renderInfo) {
      this.validateForm = this.fb.group({
        realName: [this.renderInfo.realName, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]],
        idCardNum: [this.renderInfo.idCardNum, [Validators.required, Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]],
        handPhotoUrl: [this.renderInfo.handPhotoUrl, [Validators.required]],
        mainPhotoUrl: [this.renderInfo.mainPhotoUrl, [Validators.required]],
        reversePhotoUrl: [this.renderInfo.reversePhotoUrl, [Validators.required]],
      });
    } else {
      this.validateForm = this.fb.group({
        realName: [null, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]],
        idCardNum: [null, [Validators.required, Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]],
        handPhotoUrl: [null, [Validators.required]],
        mainPhotoUrl: [null, [Validators.required]],
        reversePhotoUrl: [null, [Validators.required]],
      });
    }
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
      this.apiUserAccountService.asyncUpdateAccountIdCardInfo(this.validateForm.value).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast('保存身份证信息成功!', 'success');
        this.reloadChange.emit();
      })
    } else {
      this.systemService.presentToast('请完善表单信息后提交', 'error');
    }
  }

  /* 清除File */
  public clearFile(controlName: string) {
    if (!this.renderInfo) {
      this.validateForm.controls[controlName].setValue(undefined);
    } else {
      this.systemService.presentToast('您已经实名认证成功，如需更改请联系客服，谢谢', 'info');
    }
  }

}
