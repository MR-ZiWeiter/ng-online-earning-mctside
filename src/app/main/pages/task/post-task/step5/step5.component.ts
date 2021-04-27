import { CoreToolsFunction } from 'src/app/core/core.tools';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'swipe-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step5Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step5Component),
      multi: true
    }
  ]
})
export class Step5Component extends CoreToolsFunction implements OnInit {

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

  /* 动态添加表单校验规则 */
  private newFormGroupValidate(renderArray: any[]) {
    const formArray: FormArray = this.fb.array([]);
    renderArray.map(group => {
      /* 初始化副表单组 */
      let deputyOptions: {[x: string]: any} = {};
      /* 判断是否存在副选项 */
      if (group.deputyOptions) {
        deputyOptions = this.resultChildOptionFormGroup(null, group.deputyOptions.code, null);
      }
      /* 定义默认值 */
      const defaultSelectInputValue = (group.tagType === 2 || group.tagType === 3) ? 1 : null;
      const defaultFormGroup: FormGroup|any = this.autoGenerateFormGroupCheck(group);
      /* 自动生成默认数据校验表单 */
      const newSubmitFormObject: {[x: string]: any} = this.resultChildOptionFormGroup(null, group.code, defaultSelectInputValue);
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
  private resultChildOptionFormGroup(i: any, c: string, s: any) {
    return {
      inputVal: new FormControl(i, [Validators.required]),
      ruleCode: new FormControl(c, [Validators.required]),
      selected: new FormControl(s, [Validators.required])
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

  /* 数据提交到父组件 */
  private submitChange(): void {
    this.renderForm.emit(this.validateForm);
    this.valueChange(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      timer: [0, [Validators.required]],
      remind: [null, [Validators.required]],
      /* 追加奖励 */
      superaddFees: [null, [Validators.required]],
    });
    /* 监听表单 */
    this.validateForm.valueChanges.subscribe(values => {
      /* 提交 */
      this.submitChange();
    });
  }

}
