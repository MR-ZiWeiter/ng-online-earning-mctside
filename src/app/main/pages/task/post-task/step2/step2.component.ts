import { CoreToolsFunction } from 'src/app/core/core.tools';
import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, FormArray } from '@angular/forms';

@Component({
  selector: 'swipe-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step2Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step2Component),
      multi: true
    }
  ]
})
export class Step2Component extends CoreToolsFunction implements OnInit, ControlValueAccessor {

  /* 基础提交表单 */
  public validateForm!: FormGroup;

  /* 表单数组 FormArray */
  public get taskSubjoinMatterFormsContent() {
    return this.validateForm.get('businessTaskOriginalBaseForm.taskSubjoinMatterForms') as FormArray;
  }

  /* 实现表单校验功能 */
  public value: boolean = false;
  public disabled: boolean = false;
  public valueChange: any = () => {};
  public valueTouch: any = () => {};

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
      console.log(this.validateForm)
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      /* 基础任务信息 */
      businessTaskOriginalBaseForm: this.fb.group({
        placeType: [1, [Validators.required]],
        /* 附件 动态表单创建 */
        taskSubjoinMatterForms: this.fb.array([this.initControllRows()])
      }),
    });
    this.validateForm.valueChanges.subscribe(values => {
      this.submitChange();
    });
  }

  /* 新的一个控件组 */
  private initControllRows(type: number = 1, sort: number = 1, noQuantity: boolean = false) {
    if (noQuantity) {
      return this.fb.group({
        content: [null, [Validators.required]],
        contentType: [type, [Validators.required]],
        sort: [sort, [Validators.required, Validators.pattern(/^\d+$/)]],
      })
    } else {
      return this.fb.group({
        content: [null, [Validators.required]],
        contentType: [type, [Validators.required]],
        quantity: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
        sort: [sort, [Validators.required, Validators.pattern(/^\d+$/)]],
      })
    }
  }

  /**
   * 检验本组件
   * checkComponentForm
   */
  public checkComponentForm() {
    this.deepCheckForm(this.validateForm);
  }

  /* 选中词条回调 */
  public placeTypeChange(ev: any) {
    /* 处理默认进店方式动态表单 */
    let arrayGroup;
    switch(ev) {
      case 1:
      case 2:
      case 3:
        // const sort = Object.keys(this.taskSubjoinMatterFormsContent.value).length
        arrayGroup = this.fb.array([this.initControllRows()]);
        (this.validateForm.get('businessTaskOriginalBaseForm') as FormGroup).setControl('taskSubjoinMatterForms', arrayGroup);
        break;
        // if (this.validateForm.controls['businessTaskOriginalBaseForm']) {}
      case 4:
        arrayGroup = this.fb.array([]);
        (this.validateForm.get('businessTaskOriginalBaseForm') as FormGroup).setControl('taskSubjoinMatterForms', arrayGroup);
        break;
      case 5:
        arrayGroup = this.fb.array([this.initControllRows(1, 1, true)]);
        (this.validateForm.get('businessTaskOriginalBaseForm') as FormGroup).setControl('taskSubjoinMatterForms', arrayGroup);
        break;
      case 6:
        arrayGroup = this.fb.array([this.initControllRows(2, 1, true)]);
        (this.validateForm.get('businessTaskOriginalBaseForm') as FormGroup).setControl('taskSubjoinMatterForms', arrayGroup);
        break;
      case 7:
        arrayGroup = this.fb.array([this.initControllRows(2, 1, true), this.initControllRows(1, 1, true)]);
        (this.validateForm.get('businessTaskOriginalBaseForm') as FormGroup).setControl('taskSubjoinMatterForms', arrayGroup);
        break;
    }
  }

  /* 数据提交到父组件 */
  private submitChange(): void {
    // console.log(this.validateForm)
    this.renderForm.emit(this.validateForm);
    this.valueChange(this.validateForm.value);
  }

  /* 新增Key */
  public placeKeyNewChange() {
    const keyLength = Object.keys(this.taskSubjoinMatterFormsContent.value).length + 1;
    // if () {}
    const arrayGroup = this.initControllRows(keyLength, keyLength);
    this.taskSubjoinMatterFormsContent.push(arrayGroup);
  }

  /* 减少Key */
  public placeKeyDeleteChange(index: number, ev: MouseEvent): void {
    ev.stopPropagation();
    this.taskSubjoinMatterFormsContent.removeAt(index);
  }

   /* 提交时 数据校验 */
   public submitForm(): void {
    this.checkComponentForm();
    // console.log(this.validateForm)
    if (this.validateForm.valid) {
      this.submitChange();
    }
  }
}
