import { Component, forwardRef, OnInit, Output, EventEmitter, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormArray } from '@angular/forms';
import { ApiMerchantService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step1Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step1Component),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1Component implements OnInit, ControlValueAccessor {

    public validateForm!: FormGroup;

    /* 类型数据 */
    public typeRenderForm = {
      platformId: null,
      shopId: null
    };

    /* 商铺配置 */
    private shopConfig = {
      pageNum: 1,
      pageSize: 99,
      platformId: null
    };

    /* 商品配置 */
    private goodsTypeConfig = {
      pageNum: 1,
      pageSize: 9999
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

    /* 实现表单校验功能 */
    public value: boolean = false;
    public disabled: boolean = false;
    public valueChange: any = (_: any) => {};
    public valueTouch: any = (_: any) => {};

    /* 数据回调 */
    @Output() public renderForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
      private zone: NgZone,
      private fb: FormBuilder,
      private apiMerchantService: ApiMerchantService
    ) {
      /* 获取基础数据 */
      this.fetchPlatformListInfo();
      this.fetchGoodsTypeList();
    }

    /* 实现表单校验规则 */
    writeValue(obj: any): void {
      this.value = obj;
    }
    registerOnChange(fn: any): void {
      this.valueChange = fn;
    }
    registerOnTouched(fn: any): void {
      this.valueTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }
    /* 表单校验 */
    public validate(c: FormControl): {[key: string]: any} {
      if (this.validateForm.valid) {
        return {}
      }
      return { required: true }
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

    /* 提交时 数据校验 */
    public submitForm(): void {
      this.checkComponentForm();
      // console.log(this.validateForm)
      if (this.validateForm.valid) {
        this.submitChange();
      }
    }

    /**
     * 检验本组件
     * checkComponentForm
     */
    public checkComponentForm() {
      this.deepCheckForm(this.validateForm);
    }

    /* 校验数据 deep 方式 */
    public deepCheckForm(formGroup: FormGroup|FormControl|FormArray|any) {
      if (formGroup instanceof FormGroup) {
        for (const i in formGroup.controls) {
          if (formGroup.controls[i] instanceof FormControl) {
            formGroup.controls[i].markAsDirty();
            formGroup.controls[i].updateValueAndValidity();
          } else {
            this.deepCheckForm(formGroup.controls[i]);
          }
        }
      } else if (formGroup instanceof FormArray) {
        for(let i = 0; i < formGroup.length; i ++) {
          this.deepCheckForm(formGroup.controls[i]);
        }
      } else {
        formGroup.markAsDirty();
        formGroup.updateValueAndValidity();
      }
    }

    /* 数据提交到父组件 */
    private submitChange(): void {
      this.renderForm.emit(this.validateForm);
      this.valueChange(this.validateForm.value);
    }

    /* 选择平台后回调 */
    private platformChange = (controll: FormControl) => {
      // console.log(controll)
      if (controll.valid && controll.value) {
        // console.log(this.validateForm)
        this.shopConfig.platformId = controll.value;
        (this.validateForm.controls.businessTaskOriginalBaseForm as any).controls['shopId'].setValue(null);
        this.fetchShopList()
      }
      return {}
    }

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        businessTaskOriginalBaseForm: this.fb.group({
          /* businessTaskOriginalBaseForm 任务基础信息 */
          platformId: [null, [Validators.required, this.platformChange]],
          screenshot: [0, [Validators.required]],
          shopId: [null, [Validators.required]],
          taskQuantity: [null, [Validators.required]],
          /* END */
        }),
        goodsForm: this.fb.group({
          /* goodsForm 任务商品信息	*/
          goodTypeId: [null, [Validators.required]],
          url: [null, [Validators.required]],
          title: [null, [Validators.required]],
          spec: [null, [Validators.required]],
          unitPrice: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
          quantity: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
          image: [null, [Validators.required]],
          /* 是否主商品 */
        }),
        master: [true],
        /* END */
      });
      this.validateForm.valueChanges.subscribe(values => {
        this.submitChange();
      })
    }

  }
