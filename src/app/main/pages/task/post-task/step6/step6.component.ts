import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, FormArray } from '@angular/forms';
import { CoreToolsFunction } from 'src/app/core/core.tools';

@Component({
  selector: 'swipe-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Step6Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Step6Component),
      multi: true
    }
  ]
})
export class Step6Component extends CoreToolsFunction implements OnInit, ControlValueAccessor {

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
    // this.newFormGroupValidate(n);
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

  /* 选中模板 */
  public tempChnage(ev: any) {
    if (ev) {
      this.validateForm.addControl('templateTitle', new FormControl(null, [Validators.required]));
    } else {
      this.validateForm.removeControl('templateTitle');
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      saveTemplate: [0, [Validators.required]]
      // templateTitle: [null, [Validators.required]]
    });

    /* 监听表单 */
    this.validateForm.valueChanges.subscribe(values => {
      /* 提交 */
      this.submitChange();
    });
  }

}
