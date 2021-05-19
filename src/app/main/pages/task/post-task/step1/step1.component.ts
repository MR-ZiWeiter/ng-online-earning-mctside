import { CoreToolsFunction } from 'src/app/core/core.tools';
import { Component, forwardRef, OnInit, Output, EventEmitter, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormArray } from '@angular/forms';
import { ApiMerchantService, ApiTaskIndexService } from 'src/app/core/modules/provider/api';

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
export class Step1Component extends CoreToolsFunction implements OnInit, ControlValueAccessor {

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

  /* 基础服务费 */
  public baskFessArray: any[] = [];

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
    private fb: FormBuilder,
    private apiMerchantService: ApiMerchantService,
    private apiTaskIndexService: ApiTaskIndexService,
  ) {
    super();
    /* 获取基础数据 */
    this.fetchPlatformListInfo();
    this.fetchGoodsTypeList();
    this.fetchBasicFessInfo();
  }

  /* 实现表单校验规则 */
  writeValue(obj: any): void {
    this.value = obj;
    /* 数据回填 */
    if (obj) {
      // console.log(this.validateForm)
      this.resultFormInitel(this.validateForm, obj);
    }
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

  /* 数据提交到父组件 */
  private submitChange(): void {
    this.renderForm.emit(this.validateForm);
    this.valueChange(this.validateForm.value);
  }

  /* 选择平台后回调 */
  public platformChange(ev: any) {
    // console.log(ev)
    // console.log(this.validateForm)
    this.shopConfig.platformId = ev;
    (this.validateForm.controls.businessTaskOriginalBaseForm as any).controls['shopId'].setValue(null);
    this.fetchShopList()
    // return {}
  }

  /* 通过商品价格获取基础服务费 */
  private fetchBasicFessInfo() {
    this.apiTaskIndexService.asyncFetchTaskBasePrice().subscribe(res => {
      // console.log(res);
      this.baskFessArray = res.rel;
    })
  }

  /* 通过价格获取基础费用 */
  private priceToBasicFessValue(p: number = 0) {
    let currentBasicFess = 0;
    this.baskFessArray.some((item: any) => {
      const priceArray = item.title.split('-').map((numString: string) => parseFloat(numString))
      if (priceArray.length > 1) {
        if (priceArray[0] <= p && p <= priceArray[1]) {
          currentBasicFess = item.fees;
          return true;
        }
      } else {
        if (priceArray[0] <= p) {
          currentBasicFess = item.fees;
          return true;
        }
      }
      return false;
    })
    return currentBasicFess;
  }

  ngOnInit(): void {
    /* 初始化校验表单 */
    this.validateForm = this.fb.group({
      businessTaskOriginalBaseForm: this.fb.group({
        /* businessTaskOriginalBaseForm 任务基础信息 */
        platformId: [null, [Validators.required]],
        screenshot: [1, [Validators.required]],
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
        master: [1],
      }),
      /* END */
    });
    /* 所有数据监听并上传回调 */
    this.validateForm.valueChanges.subscribe(values => {
      this.submitChange();
    });
    /* 监听下单价格 回调监听 */
    this.validateForm.get('goodsForm.unitPrice')?.valueChanges.subscribe(value => {
      // console.log(value, this.priceToBasicFessValue(value))
      this.validateForm.addControl('baseFess', new FormControl(this.priceToBasicFessValue(value)));
    });
  }

}
