import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'swipe-ahtion-home',
  templateUrl: './ahtion-home.component.html',
  styleUrls: ['./ahtion-home.component.scss']
})
export class AhtionHomeComponent implements OnInit {
  public urlMap = {
    Y: '/assets/images/public/check-circle-fill@2x.png',
    N: '/assets/images/public/exclamation-circle-fill@2x.png'
  }
  public userInfoList: Array<any> = [
    {
      type: '实名认证',
      status: 0,
      iconUrl: '/assets/images/public/check-circle-fill@2x.png',
      value: ''
    },
    {
      type: '手机认证',
      status: 0,
      iconUrl: '/assets/images/public/sj-icon@2x.png',
      value: ''
    },
    {
      type: '银行认证',
      status: 0,
      iconUrl: '/assets/images/public/bank-card@2x.png',
      value: ''
    },
    {
      type: '绑定微信',
      status: 0,
      iconUrl: '/assets/images/public/wechat-icon@2x.png',
      value: ''
    },
    {
      type: '绑定支付宝',
      status: 0,
      iconUrl: '/assets/images/public/zfb-icon@2x.png',
      value: ''
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
