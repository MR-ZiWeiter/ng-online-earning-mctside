import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'swipe-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent implements OnInit {

  @Input() public title = '标题';
  @Input() public nzBorderless = false;
  @Input() public width = 'width:100%';
  constructor() { }

  ngOnInit() {
  }

}
