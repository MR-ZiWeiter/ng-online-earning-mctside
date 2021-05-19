import { UserService } from 'src/app/core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import cityJson from '/assets/json/city.json';
import { ApiSystemService, ApiUserAccountService, ApiUserIndexService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';
// const cityJson: any = [];
@Component({
  selector: 'swipe-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
  public radioValue = 'A';
  public date = null;
  public values = null;

  public basicInfo: any = {};

  public genderRender: any[] = [
    {
      label: '男',
      value: 0
    },
    {
      label: '女',
      value: 1
    },
    {
      label: '未知',
      value: 2
    },
  ];

  public cityJsonRenderArray: any = [];

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.apiUserIndexService.asyncFetchUserBisicUpdate({
        ...this.validateForm.value,
        addressCode: this.validateForm.value.addressCode[this.validateForm.value.addressCode.length - 1]
      }).subscribe(res => {
        this.systemService.presentToast('更新个人资料成功', 'success');
        this.apiUserIndexService.asyncFetchBasicInfo().subscribe();
      })
    } else {
      this.systemService.presentToast('请完善表单后提交数据', 'error');
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    // private msg: NzMessageService,
    private systemService: SystemService,
    private apiSystemService: ApiSystemService,
    private apiUserAccountService: ApiUserAccountService,
    private apiUserIndexService: ApiUserIndexService
  ) {
    // const wind: any = window.open('about:blank');
    // wind.document.body.innerText = JSON.stringify(this.deepChange(cityJson))
    this.apiSystemService.asyncFetchSystemCityList().subscribe(res => {
      // console.log(res)
      this.cityJsonRenderArray = res;
      if (this.validateForm.controls['addressCode']) {
        this.validateForm.controls['addressCode'].setValue(this.deepChange(this.cityJsonRenderArray, Number(this.basicInfo.areaCode)))
      }
    })
    this.userService.getUserBasicInfo().subscribe(renderInfo => {
      // console.log(renderInfo)
      if (renderInfo) {
        this.basicInfo = renderInfo;
        // console.log(Number(renderInfo.areaCode))
        // console.log(this.deepChange(cityJson, Number(renderInfo.areaCode)))
        // console.log([renderInfo.provinceCode, renderInfo.cityCode, renderInfo.areaCode])
        /* 初始化数据-初始化表单一体 */
        this.validateForm = this.fb.group({
          avatarUrl: [renderInfo.avatar],
          email: [renderInfo.email, [Validators.email, Validators.required]],
          signature: [renderInfo.signature, [Validators.required]],
          gender: [renderInfo.gender, [Validators.required]],
          addressDetail: [renderInfo.addressDetail, [Validators.required]],
          addressCode: [this.deepChange(this.cityJsonRenderArray, Number(renderInfo.areaCode)), [Validators.required]],
          birthday: [renderInfo.birthday, [Validators.required]]
        });
      } else {
        this.validateForm = this.fb.group({
          avatarUrl: [null],
          email: [null, [Validators.email, Validators.required]],
          signature: [null, [Validators.required]],
          gender: [null, [Validators.required]],
          addressDetail: [null, [Validators.required]],
          addressCode: [null, [Validators.required]],
          birthday: [null, [Validators.required]]
        });
      }

      /* 监听头像 */
      this.validateForm.controls['avatarUrl'].valueChanges.subscribe(renderInfo => {
        // console.log(renderInfo);
        if (renderInfo) {
          this.apiUserAccountService.asyncFetchAccountAvatarChange({
            avatarUrl: renderInfo
          }).subscribe(info => {
            // console.log(info)
            this.validateForm.controls['avatarUrl'].setValue(info.rel);
            this.systemService.presentToast('修改头像成功', 'success');
            this.apiUserIndexService.asyncFetchBasicInfo().subscribe();
          })
        }
      })
    })
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

  ngOnInit(): void {}

}
