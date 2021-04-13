import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiMerchantService } from 'src/app/core/modules/provider/api';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'swipe-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

    public selectedValue = null;

    public validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
      type: 'info-circle',
      theme: 'twotone'
    };

    fileList: NzUploadFile[] = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error'
      }
    ];
    previewImage: string | undefined = '';
    previewVisible = false;

    /* 类型数据 */
    public typeRenderForm = {
      platformId: null,
      shopId: null
    };

    /* 商铺配置 */
    private shopConfig = {
      pageNum: 1,
      pageSize: 20,
      platformId: null
    };

    /* 商品配置 */
    private goodsTypeConfig = {
      pageNum: 1,
      pageSize: 20
    };

    /* 列表集合 */
    public packgeConfig: any = {
      platform: [],
      shop: [],
      goodstype: []
    };

    /* 数据监控 */
    public set platformSelect(n: any) {
      this.typeRenderForm.platformId = n;
    }
    public get platformSelect(): any {
      return this.typeRenderForm.platformId;
    }

    constructor(
      private fb: FormBuilder,
      private apiMerchantService: ApiMerchantService
    ) {
      /* 获取基础数据 */
      this.fetchPlatformListInfo();
    }

    /* 获取电商平台数据 */
    private fetchPlatformListInfo() {
      this.apiMerchantService.asyncFetchPlatformListInfo().subscribe(res => {
        // console.log(res)
        this.packgeConfig.platform = res.rel;
      })
    }

    /* 获取商铺类别 */
    private fetchShopList() {
      this.apiMerchantService.asyncFetchShopList(this.shopConfig).subscribe(res => {
        // console.log(res)
        this.packgeConfig.shop = res.rel;
      })
    }

    /* 获取商品类目 */
    private fetchGoodsTypeList() {
      this.apiMerchantService.asyncFetchGoodsTypeList(this.goodsTypeConfig).subscribe(res => {
        // console.log(res)
        this.packgeConfig.goodstype = res.rel;
      })
    }

    handlePreview = async (file: NzUploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj!);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    };

    submitForm(): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
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
        temp: [null, [Validators.required]],
        password: [null, [Validators.required]],
        checkPassword: [null, [Validators.required, this.confirmationValidator]],
        nickname: [null, [Validators.required]],
        phoneNumberPrefix: ['+86'],
        phoneNumber: [null, [Validators.required]],
        website: [null, [Validators.required]],
        captcha: [null, [Validators.required]],
        norm: [null],
        price: [null, [Validators.pattern(/^\d+(\.\d+)?$/)]],
        agree: [false]
      });
    }

  }
