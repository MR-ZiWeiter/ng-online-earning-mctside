import { UserService } from 'src/app/core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import cityJson from './city.json';
import { ApiUserIndexService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

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
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

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

  public cityJsonRenderArray: any = cityJson;

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
    private apiUserIndexService: ApiUserIndexService
  ) {
    // const wind: any = window.open('about:blank');
    // wind.document.body.innerText = JSON.stringify(this.deepChange(cityJson))

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
          addressCode: [this.deepChange(cityJson, Number(renderInfo.areaCode)), [Validators.required]],
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

  // 上传模块
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.systemService.presentToast('You can only upload JPG file!', 'error');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.systemService.presentToast('Image must smaller than 2MB!', 'error');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  }
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    console.log(img,'img');
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.systemService.presentToast('Network error', 'error');
        this.loading = false;
        break;
    }
  }
}
