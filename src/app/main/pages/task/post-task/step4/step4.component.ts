import { CoreToolsFunction } from 'src/app/core/core.tools';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'swipe-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step4Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step4Component),
      multi: true
    }
  ]
})
export class Step4Component extends CoreToolsFunction implements OnInit, ControlValueAccessor {

  public selectedValue = null;

  public validateForm!: FormGroup;

  /* 初始数据 */
  private _renderInfo: any[] = [];

  /* 实现表单校验功能 */
  public value: boolean = false;
  public disabled: boolean = false;
  public valueChange: any = () => {};
  public valueTouch: any = () => {};

  @Input()
  public set renderInfo(n: any[]) {
    this._renderInfo = n;
    this.newFormGroupValidate(n);
  }
  public get renderInfo(): any[] {
    return this._renderInfo;
  }

  /* 数据回调 */
  @Output() private renderForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    super();
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

  /* 校验 */
  public validate(control: FormControl): {[x: string]: any} {
    if (this.validateForm.valid) {
      return {}
    }
    return { required: true }
  }

  /* 表单路径返回当前表单Controll */
  public resultPathToFormControll(path: string): FormArray|FormControl|FormGroup|null|AbstractControl|any {
    // console.log(this.validateForm.get(path))
    return ((this.validateForm.get(path) as any) || {}).controls || []
  }

  /* 返回当前选中的数据 */
  public resultSelectChangeInfo(id: number, vos: any) {
    let result: any = {};
    vos.requiresRuleItemVos.map((item: any) => {
      if (item.id === id) {
        result = item;
        return true
      }
      return false
    })
    return result
  }

  /* 特殊处理副商品数量 */
  public resultSubDuctInfoNumber(info: any): number {
    if (info.requiresSuboptionForm) {
      return info.requiresSuboptionForm.suboption.length
    }
    return 0;
  }

  /* 处理副商品的价格 */
  public resultSubproductPriceInfo(item: any): number {
    return (this.resultSelectChangeInfo(item.value.selectedItemId, item.value).fees||0) * (this.resultSubDuctInfoNumber(item.value))
  }

  public resultWithPriceInfo(item: any) {
    return (this.resultSelectChangeInfo(item.value.selectedItemId, item.value).fees||0)
  }

  //


  /* 返回单选框选中的值 */
  public resultCheckRadioContext(info: any): {[x: string]: any} {
    // info.selectedItemId
    let checkInfo = {};
    info.requiresRuleItemVos.some((item: any) => {
      if (info.selectedItemId === item.id) {
        checkInfo = item;
        return true;
      }
      return false;
    })
    return checkInfo;
  }

  /* 动态添加表单校验规则 */
  private newFormGroupValidate(renderArray: any[]) {
    const formArray: FormArray = this.fb.array([]);
    renderArray.map(group => {
      /* 初始化副表单组 */
      let deputyOptions: {[x: string]: any}|null = null;
      /* 判断是否存在副选项 */
      if (group.deputyOptions) {
        /* 设置默认值 */
        deputyOptions = this.resultChildOptionFormGroup(0, group.deputyOptions.code, null, group.deputyOptions.tagType);
      }
      /* 定义默认值 */
      let defaultSelectInputValue: number|string|null|any;
      if (group.tagType === 2 || group.tagType === 3) {
        if (group.requiresRuleItemVos.length) {
          defaultSelectInputValue = group.requiresRuleItemVos[0].id;
        } else {
          defaultSelectInputValue = null;
        }
      }
      const defaultFormGroup: FormGroup|any = this.autoGenerateFormGroupCheck(group);
      /* 自动生成默认数据校验表单 */
      /* 设置默认值 */
      const newSubmitFormObject: {[x: string]: any} = this.resultChildOptionFormGroup(0, group.code, defaultSelectInputValue, group.tagType);
      /* 添加其他自定义表单数据 */
      for (const key in deputyOptions) {
        defaultFormGroup.get('deputyOptions').addControl(key, deputyOptions[key]);
      }
      // defaultFormGroup.addControl('deputyOptions', deputyOptions);
      /* 添加默认数据表单到FormGroup */
      for (const key in newSubmitFormObject) {
        defaultFormGroup.addControl(key, newSubmitFormObject[key]);
      }
      /* 添加控件到数组 */
      formArray.push(defaultFormGroup);
    })
    // console.log(this.validateForm)
    if (this.validateForm) {
      this.validateForm.addControl('requiresForms', formArray);
    }
  }

  /* 自动生成对应类型的表单校验规则 */
  private autoGenerateFormGroupCheck(renderInfo: Array<any>|{[key: string]: any}): FormArray|FormControl|FormGroup|AbstractControl {
    if (renderInfo instanceof Array) {
      const renderInfoFormArray: FormArray = this.fb.array([]);
      renderInfo.map(item => {
        renderInfoFormArray.push(this.autoGenerateFormGroupCheck(item));
      })
      return renderInfoFormArray
    } else {
      const renderInfoGroup: FormGroup = this.fb.group({});
      for (const key in renderInfo) {
        if (renderInfo[key] instanceof Array || renderInfo[key] instanceof Object) {
          renderInfoGroup.addControl(key, this.autoGenerateFormGroupCheck(renderInfo[key]));
        } else {
          renderInfoGroup.addControl(key, new FormControl(renderInfo[key]));
        }
      }
      return renderInfoGroup
    }
  }

  /* 返回动态表单子数据 */
  private resultChildOptionFormGroup(i: any, c: string, s: any, type: number = 1) {
    switch(type) {
      case 1:
        return {
          inputVal: new FormControl(i, [Validators.required]),
          ruleCode: new FormControl(c, [Validators.required])
        }
      case 2:
      case 3:
      case 4:
        return {
          ruleCode: new FormControl(c, [Validators.required]),
          selectedItemId: new FormControl(s, [Validators.required])
        }
      default:
        return {
          inputVal: new FormControl(i, [Validators.required]),
          ruleCode: new FormControl(c, [Validators.required]),
          selectedItemId: new FormControl(s, [Validators.required])
        }
    }

  }

  /**
   * 检验本组件
   * checkComponentForm
   */
   public checkComponentForm() {
    this.deepCheckForm(this.validateForm);
  }

  /* 提交数据前校验 */
  public submitForm(): void {
    this.deepCheckForm(this.validateForm);
    if (this.validateForm.valid) {
      this.submitChange();
    }
  }

  /* 特殊单选框处理 */
  public handlerRadioChange(renderInfo: any, index: number, ev: any) {
    // console.log(ev)
    // console.log(renderInfo)
    // console.log(renderInfo.selectedItemId)
    // switch() {}
    renderInfo.requiresRuleItemVos.some((item: any) => {
      // switch() {}
      // console.log(item)
      const currentFromGroup = (this.validateForm.get('requiresForms') as any).controls[index];
      if (item.id === ev) {
        const requiresSuboptionForm: FormGroup = this.fb.group({modelType: item.modelType});
        let suboption: FormArray;
        /* 清除所有能包含的表单组控件 */
        currentFromGroup.removeControl('requiresSuboptionForm');
        switch(item.modelType) {
          case 0:
            break;
          case 1:
            suboption = this.fb.array([
              this.fb.group(this.resultSubjoinFromGroupObject())
            ]);
            requiresSuboptionForm.addControl('suboption', suboption);
            currentFromGroup.addControl('requiresSuboptionForm', requiresSuboptionForm);
            break;
          case 2:
          case 3:
            suboption = this.fb.array([
              this.fb.group(this.resultSubjoinFromGroupObject(true, item.modelType === 3 ? true : false))
            ]);
            requiresSuboptionForm.addControl('suboption', suboption);
            currentFromGroup.addControl('requiresSuboptionForm', requiresSuboptionForm);
            break;
          case 4:
            suboption = this.fb.array([
              this.fb.group(this.resultWithGoodsFormGroupObject())
            ]);
            requiresSuboptionForm.addControl('suboption', suboption);
            currentFromGroup.addControl('requiresSuboptionForm', requiresSuboptionForm);
            break;
        }
        return true;
      }
      return false;
    })
  }

  /* 新增指定评语 */
  public tempNewChange(control: FormArray, index: number, type: number) {
    switch(type) {
      case 0:
        break;
      case 1:
        control.push(this.fb.group(this.resultSubjoinFromGroupObject()));
        break;
      case 2:
      case 3:
        control.push(this.fb.group(this.resultSubjoinFromGroupObject(true, type === 3 ? true : false)));
        break;
      case 4:
        control.push(this.fb.group(this.resultWithGoodsFormGroupObject()));
        break;
    }
    // console.log(control);
  }

  /* 删除评语 */
  public placeKeyDeleteChange(control: FormArray, index: number) {
    control.removeAt(index);
  }

  /* 返回附属商品信息表单控件组 */
  public resultWithGoodsFormGroupObject() {
    return {
      master: [0],
      url: [null, [Validators.required]],
      image: [null, [Validators.required]],
      title: [null, [Validators.required]],
      unitPrice: [null, [Validators.required]],
    }
  }

  /* 返回附件表单控件组 */
  public resultSubjoinFromGroupObject(isUrls: boolean = false, isVideo: boolean = false) {
    if (isUrls) {
      return {
        text: new FormControl(null, [Validators.required]),
        urls: new FormControl(null, [Validators.required]),
        isVideo: new FormControl(isVideo)
      }
    } else {
      return {
        text: new FormControl(null, [Validators.required]),
        isVideo: new FormControl(isVideo)
      }
    }
  }

  /* 数据提交到父组件 */
  private submitChange(): void {
    this.renderForm.emit(this.validateForm);
    this.valueChange(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    /* 判断是否已经获取到初始化数据 */
    if (this.renderInfo.length) {
      this.newFormGroupValidate(this.renderInfo);
    }
    /* 监听表单 */
    this.validateForm.valueChanges.subscribe(values => {
      // console.log(values)
      /* 提交 */
      this.submitChange();
    });
  }
}
