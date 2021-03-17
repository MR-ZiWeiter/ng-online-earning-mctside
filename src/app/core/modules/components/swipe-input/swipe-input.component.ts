import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'swipe-input',
  templateUrl: './swipe-input.component.html',
  styleUrls: ['./swipe-input.component.scss']
})
export class SwipeInputComponent implements OnInit {

  public isFocus: boolean = false;
  public isPass: boolean = false;

  /* @Input 传入 */
  @Input() public value!: string|number|null;
  @Input() public name: string = 'custom';
  @Input() public placeholder!: string;
  @Input() public type!: string;
  @Input() public pattern!: RegExp;
  @Input() public isRequired: boolean = false;

  @Input() public isPrefix: boolean = false;
  @Input() public isSuffix: boolean = false;
  @Input() public isClear: boolean = false;
  @Input() public maxLength!: number;
  @Input()
  public minLength!: number;

  @Output() private valueChange: EventEmitter<string|number|null> = new EventEmitter<string|number|null>();

  constructor() { }

  ngOnInit() {
  }

  /* 输入框双向绑定回传 */
  public inputChange(info: string|number) {
    /* 通过传入的正则校验 */
    this.isPass = this.inputRexgEvent();
    /* 传出数据 */
    this.valueChange.emit(info);
    /* 判断当类型为Number时长度截取无效问题 */
    if (this.type === 'number' && this.maxLength) {
      const getSliceValue = info.toString().slice(0, this.maxLength)
      this.value = getSliceValue
      this.valueChange.emit(getSliceValue)
      console.log(this.value)
    }
  }

  /* Input框验证 */
  public inputRexgEvent() {
    const regexp = new RegExp(this.pattern);
    if (regexp.test((this.value || '').toString())) {
      if (this.value) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  /* 事件回调 */
  public inputFocusChange(ev: FocusEvent) {
    this.isFocus = true;
  }
  public inputBlurChange(ev: FocusEvent) {
    this.isFocus = false;
  }
  public clearInputEvent(ev: MouseEvent) {
    this.value = null;
    this.isPass = false;
    this.valueChange.emit(null);
  }

}
