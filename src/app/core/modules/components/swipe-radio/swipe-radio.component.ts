import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'swipe-swipe-radio',
  templateUrl: './swipe-radio.component.html',
  styleUrls: ['./swipe-radio.component.scss']
})
export class SwipeRadioComponent implements OnInit {
  @Input() public radioValue = '';
  @Input() public radioList = [
    { type: 'A', text: '男' },
    { type: 'B', text: '女' },
    { type: 'C', text: '保密' }
  ];

  @Output() private radioChange = new EventEmitter<any>();
  constructor() { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  onRadioChange(e: any) {
    // console.log(e,'eeee');
    this.radioChange.emit(e)
  }
}
