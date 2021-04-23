import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-appeal-modal',
  templateUrl: './appeal-modal.component.html',
  styleUrls: ['./appeal-modal.component.scss']
})
export class AppealModalComponent implements OnInit {

  @Input() public renderInfo?: any = {};

  constructor() { }

  ngOnInit() {
  }

}
