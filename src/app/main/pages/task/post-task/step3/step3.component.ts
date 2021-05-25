import { Component, Input, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { ApiReleaseService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step3Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step3Component),
      multi: true
    }
  ]
})
export class Step3Component extends CoreToolsFunction implements OnInit, ControlValueAccessor {

  public selectedValue = null;

  public validateForm!: FormGroup;

  /* 购物标签 */
  public shopLabels: any[] = [];

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

  constructor(
    private fb: FormBuilder,
    private apiReleaseService: ApiReleaseService
  ) {
    super();
    this.apiReleaseService.asyncFetchTaskLabelsInfo({
      pageNum: 1,
      pageSize: 9999
    }).subscribe(res => {
      this.shopLabels = res.rel;
    })
  }
  /* 实现表单校验规则 */
  writeValue(obj: any): void {
    this.value = obj;
    /* 数据回填 */
    if (obj) {
      /* 处理默认表单回填 */
      this.resultFormInitel(this.validateForm, obj);
      /* 处理特殊未双向绑定数据 */
      const checkedCode = this.validateForm.value.labels;
      this.shopLabels = this.shopLabels.map((label: any) => {
        if (checkedCode.includes(label.code)) {
          label.checked = true;
        }
        return label
      })
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

  /* 动态添加表单校验规则 */
  private newFormGroupValidate(renderArray: any[]) {
    const formArray: FormArray = this.fb.array([]);
    renderArray.map(group => {
      /* 初始化副表单组 */
      let deputyOptions: {[x: string]: any}|null = null;
      /* 判断是否存在副选项 */
      if (group.deputyOptions) {
        deputyOptions = this.resultChildOptionFormGroup(null, group.deputyOptions.code, null, group.deputyOptions.tagType);
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
      const newSubmitFormObject: {[x: string]: any} = this.resultChildOptionFormGroup(null, group.code, defaultSelectInputValue, group.tagType);
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

  /* 复选框回调 */
  public checkBoxChange(renderArray: string[]) {
    this.validateForm.controls['labels'].setValue(renderArray);
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

  /* 数据提交到父组件 */
  private submitChange(): void {
    // console.log(this.validateForm)
    this.renderForm.emit(this.validateForm);
    this.valueChange(this.validateForm.value);
  }

  /* 初始化 */
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      labels: [null]
    });
    /* 判断是否已经获取到初始化数据 */
    if (this.renderInfo.length) {
      this.newFormGroupValidate(this.renderInfo);
    }
    /* 监听表单 */
    this.validateForm.valueChanges.subscribe(values => {
      // console.log(values)
      this.submitChange();
    });
  }

}
