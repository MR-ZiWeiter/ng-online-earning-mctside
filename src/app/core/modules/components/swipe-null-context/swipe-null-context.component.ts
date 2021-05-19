import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-null-context',
  templateUrl: './swipe-null-context.component.html',
  styleUrls: ['./swipe-null-context.component.scss']
})
export class SwipeNullContextComponent implements OnInit {

  @Input() public context: string = '暂无数据';

  constructor() { }

  ngOnInit() {
  }

}
