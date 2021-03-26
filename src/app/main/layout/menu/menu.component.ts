import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public openMap: Array<boolean> = [true, false, false, false] ;
  public menuMap: Array<any> = [
    { title: '我的任务', icon: 'carry-out' , list: [
      { name: '发布任务', id: '0-1' , path: 'task/post-task'},
      { name: '绑定商铺', id: '0-2' , path: 'task/bound-shop'},
      { name: '已发布任务', id: '0-3' , path: 'task/published-list' },
      { name: '任务模版', id: '0-4' , path: 'task/task-template'},
      { name: '收费明细', id: '0-5' , path: 'task/charge-details'},
      { name: '我的订单', id: '0-6' , path: 'task/order-management'},
     ] },
     { title: '财务明细', icon: 'credit-card' , list: [
      { name: '账户充值', id: '1-1' , path: 'financial/account-recharge'},
      { name: '账户提现', id: '1-2' , path: 'financial/account-withdrawal'},
      { name: '充值记录', id: '1-3' , path: 'financial/recharge-record' },
      { name: '资金明细', id: '1-4' , path: 'financial/funding-details'},
      { name: '提现明细', id: '1-5' , path: 'financial/withdrawal-details'},
     ] },
     { title: '我的申诉', icon: 'comment' , list: [
      { name: '发现申诉', id: '2-1' , path: 'appeal/new-appeal'},
      { name: '我发起的申诉', id: '2-2' , path: 'appeal/my-appeal'},
      { name: '我收到的申诉', id: '2-3' , path: 'appeal/received-appeal'},
     ] },
     { title: '个人资料', icon: 'user' , list: [
      { name: '个人资料', id: '3-1' , path: 'user-info/basic-info'},
      { name: '修改密码', id: '3-2' , path: 'user-info/change-pwd'},
      { name: '实名认证', id: '3-3' , path: 'user-info/bind-info'},
     ] }
  ];
  constructor() {
  }

  ngOnInit() {
  }



  openHandler(value: number): void {
    // console.log(value);
    this.openMap.forEach((item: boolean, index: number) => {
      if ( value === index ) {
        this.openMap[index] = true;
      } else {
        this.openMap[index] = false;
      }
    });
  }
}
