import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiSystemService, ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';
import { bankRegExp } from './bank-reg';

@Component({
  selector: 'swipe-bank-ahtion',
  templateUrl: './bank-ahtion.component.html',
  styleUrls: ['./bank-ahtion.component.scss']
})
export class BankAhtionComponent implements OnInit {
  public validateForm!: FormGroup;
  public values = [];
  public options = [];
  public cityJsonRenderArray: any = [];
  public backList: any[] = [];
  public refCode: any = {
    isCode: false,
    timer: 0,
    code: 60
  };
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
    private apiSystemService: ApiSystemService,
    private apiUserAccountService: ApiUserAccountService,
  ) { }

  ngOnInit() {
    this.apiSystemService.asyncFetchSystemCityList().subscribe(res => {
      // console.log(res)
      this.cityJsonRenderArray = res;
      if (this.renderInfo && this.validateForm.controls['cityCode']) {
        this.validateForm.controls['cityCode'].setValue(this.deepChange(this.cityJsonRenderArray, Number(this.renderInfo.cityCode)));
      }
    })
    this.apiSystemService.asyncFetchSystemBankList().subscribe(res => {
      console.log(res);
      this.backList = res.rel;
    })
    if (this.renderInfo) {
      this.validateForm = this.fb.group({
        realName: [this.renderInfo.realName, [Validators.required]],
        idCardNum: [this.renderInfo.idCardNum, [Validators.required]],
        bankId: [Number(this.renderInfo.bankId), [Validators.required]],
        branchBankName: [this.renderInfo.branchBankName, [Validators.required]],
        cityCode: [this.deepChange(this.cityJsonRenderArray, Number(this.renderInfo.cityCode)), [Validators.required]],
        mobile: [this.renderInfo.mobile, [Validators.required]],
        smsCode: [this.renderInfo.smsCode, [Validators.required]],
        bankCardNum: [this.renderInfo.bankCardNum, [Validators.required]]
      });
    } else {
      this.validateForm = this.fb.group({
        realName: [null, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]],
        idCardNum: [null, [Validators.required, Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]],
        bankId: [null, [Validators.required]],
        branchBankName: [null, [Validators.required, Validators.pattern(/^([\u4e00-\u9fa5\·]{1,10})$/)]],
        cityCode: [null, [Validators.required]],
        mobile: [null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$/)]],
        smsCode: [null, [Validators.required]],
        bankCardNum: [null, [Validators.required, Validators.pattern(bankRegExp)]]
      });
    }
  }
  onChanges(e: any) {
    console.log(e, '银行所在地');
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
    // console.log(this.validateForm)
    if (this.validateForm.valid) {
      this.apiUserAccountService.asyncUpdateAccountBankInfo({
        ...this.validateForm.value,
        cityCode: this.validateForm.value.cityCode[this.validateForm.value.cityCode.length - 1]
      }).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast('保存银行卡信息成功!', 'success');
        this.reloadChange.emit();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }
  deepChange(city: Array<any>, code: number, _arr: Array<any> = []): any {
    let arr = _arr;
    city.some(item => {
      if (item.children && item.children.length) {
        const isChild = this.deepChange(item.children, code)
        if (isChild.length) {
          arr.push(item.cityId)
          this.deepChange(item.children, code, arr)
          return true
        }
      } else {
        if (item.cityId === code) {
          arr.push(item.cityId)
          return true
        }
      }
      return false
    })
    return arr
  }
}
