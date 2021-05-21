import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'swipe-input-number',
  templateUrl: './swipe-input-number.component.html',
  styleUrls: ['./swipe-input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeInputNumberComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SwipeInputNumberComponent),
      multi: true
    }
  ]
})
export class SwipeInputNumberComponent implements OnInit, ControlValueAccessor {

  public inputVal!: FormControl;

  public value: number = 1;
  public valueChange: any = () => {};
  public touchChange: any = () => {};

  @Input() public placeholder!: any;
  @Input() public min!: any;
  @Input() public max!: any;
  @Input() public minLength!: any;
  @Input() public maxLength!: any;


  constructor() { }
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
    this.valueChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
    this.touchChange = fn;
  }

  validate(controll: FormControl) {
    this.inputVal = controll;
    return {};
  }

  ngOnInit() {
  }

  public onHandlerChange(type: 'plus'|'less') {
    let value = this.inputVal.value || 0;
    switch(type) {
      case 'less':
        value--;
        break;
      case 'plus':
        value++;
        break;
    }
    this.inputVal.setValue(value);
  }

}
