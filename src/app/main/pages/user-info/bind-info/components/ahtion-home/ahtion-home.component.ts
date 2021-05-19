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
      iconUrl: '/assets/images/public/user-info-check@2x.png',
      value: 'C',
      label: ''
    },
    {
      type: '手机认证',
      status: 0,
      iconUrl: '/assets/images/public/sj-icon@2x.png',
      value: 'B',
      label: ''
    },
    {
      type: '银行认证',
      status: 0,
      iconUrl: '/assets/images/public/bank-card@2x.png',
      value: 'D',
      label: ''
    },
    {
      type: '绑定微信',
      status: 0,
      iconUrl: '/assets/images/public/wechat-icon@2x.png',
      value: 'E',
      label: ''
    },
    {
      type: '绑定支付宝',
      status: 0,
      iconUrl: '/assets/images/public/zfb-icon@2x.png',
      value: 'F',
      label: ''
    },
  ];

  @Input() public set renderInfo(n: any) {
    // console.log(n)
    if (n.idCardVO) {
      this.userInfoList[0].status = 1;
      // this.userInfoList[0].label =
    }
    if (n.phoneVO) {
      this.userInfoList[1].status = 1;
      this.userInfoList[1].label = n.phoneVO.mobile;
    }
    if (n.bankCardVO) {
      this.userInfoList[2].status = 1;
      this.userInfoList[2].label = n.bankCardVO.realName;
    }
    if (n.weChatVO) {
      this.userInfoList[3].status = 1;
      this.userInfoList[3].label = n.weChatVO.realName;
    }
    if (n.aliPayVO) {
      this.userInfoList[4].status = 1;
      this.userInfoList[4].label = n.aliPayVO.realName;
    }
  }

  @Output() private viewChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public openViewTypeChange(info: any) {
    // console.log(info);
    this.viewChange.emit(info);
  }

}
