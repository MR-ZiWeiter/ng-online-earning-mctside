import { Component, OnInit , Input , EventEmitter , Output} from '@angular/core';

@Component({
  selector: 'swipe-swipe-get-code-input',
  templateUrl: './swipe-get-code-input.component.html',
  styleUrls: ['./swipe-get-code-input.component.scss']
})
export class SwipeGetCodeInputComponent implements OnInit {
  @Input() public placeholder = '';
  @Input() public maxLength!: number;
  @Input() public minLength!: number;
  @Input() public type = 'text';
  @Input() public value = '';
  public codeText = '发送验证码';
  public second = 60;
  public timer: number | undefined ;
  // tslint:disable-next-line:no-output-native
  @Output() private change = new EventEmitter<string>();
  @Output() private getCode = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  inputChange(e: any) {
    this.change.emit(e);
  }

  sendCode(e: any) {
    if (this.second > 0 && this.second < 60 ) { return; }
    this.getCode.emit();
    this.timer = window.setInterval(() => {
      this.second --;
      this.codeText = this.second + 's';
      if (this.second === 0) {
        clearInterval(this.timer);
        this.second = 60;
        this.codeText = '重新发送验证';
      }
    }, 1000);
  }

}
