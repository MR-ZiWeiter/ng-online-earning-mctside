import { SystemService } from './../../../../../../core/services/system/system.service';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'swipe-bind-zfb',
  templateUrl: './bind-zfb.component.html',
  styleUrls: ['./bind-zfb.component.scss']
})
export class BindZfbComponent implements OnInit {

  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
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
  ) {}

  ngOnInit() {
    if (this.renderInfo) {
      this.validateForm = this.fb.group({
        account: [this.renderInfo.account, [Validators.required]],
        realName: [this.renderInfo.realName, [Validators.required]]
      });
    } else {
      this.validateForm = this.fb.group({
        account: [null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$|^(\w+((-\w+)|(\.\w+))*)\+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)]],
        realName: [null, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]]
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
      this.apiUserAccountService.asyncUpdateAccountAlipayInfo(this.validateForm.value).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast('保存支付宝信息成功!', 'success');
        this.reloadChange.emit();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }
}
