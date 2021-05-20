import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';
@Component({
  selector: 'swipe-bind-we-chat',
  templateUrl: './bind-weChat.component.html',
  styleUrls: ['./bind-weChat.component.scss'],
})
export class BindWeChatComponent implements OnInit {
  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
  public _renderInfo: any;
  @Input()
  public set renderInfo(n: any) {
    console.log(n)
    this._renderInfo = n;
  }
  public get renderInfo() {
    return this._renderInfo;
  }
  @Output() private reloadChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private apiUserAccountService: ApiUserAccountService) {}
  ngOnInit() {
    if (this.renderInfo) {
      this.validateForm = this.fb.group({
        account: [this.renderInfo.account, [Validators.required]],
        imageUrl: [this.renderInfo.imageUrl, [Validators.required]],
        realName: [this.renderInfo.realName, [Validators.required]],
      });
    } else {
      this.validateForm = this.fb.group({
        account: [null, [Validators.required]],
        imageUrl: [null, [Validators.required]],
        realName: [null, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]],
      });
    }
  }
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.apiUserAccountService.asyncUpdateAccountWechatInfo(this.validateForm.value).subscribe(res => {
        this.systemService.presentToast('保存微信信息成功!', 'success');
        this.reloadChange.emit();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }


}
