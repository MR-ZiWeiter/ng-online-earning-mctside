import { Component, OnInit, Input , Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'swipe-swipe-radio',
  templateUrl: './swipe-radio.component.html',
  styleUrls: ['./swipe-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeRadioComponent),
      multi: true
    }
  ]
})
export class SwipeRadioComponent implements OnInit, ControlValueAccessor {
  // @Input() public radioValue = '';

  public value!: any;
  public disabled: boolean = false;
  valueChange: any = () => {};
  valueTouch: any = () => {};

  @Input() public radioList: any[] = [];
  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj;
    // console.log('FN-CHANGE');
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.valueChange = fn;
    // console.log('FN-ONCHANGE');
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.valueTouch = fn;
    // console.log('FN-ONTOUCH');
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // console.log('FN-Disabled');
    // throw new Error('Method not implemented.');
  }

  // tslint:disable-next-line:typedef
  onRadioChange(e: any) {
    // console.log(e,'eeee');
    this.valueChange(e)
  }
}
