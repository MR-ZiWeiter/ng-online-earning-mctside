import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiSystemService, ApiUserAccountService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

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
        realName: [null, [Validators.required]],
        idCardNum: [null, [Validators.required]],
        bankId: [null, [Validators.required]],
        branchBankName: [null, [Validators.required]],
        cityCode: [null, [Validators.required]],
        mobile: [null, [Validators.required]],
        smsCode: [null, [Validators.required]],
        bankCardNum: [null, [Validators.required]]
      });
    }
  }
  onChanges(e: any) {
    console.log(e, '银行所在地');
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
