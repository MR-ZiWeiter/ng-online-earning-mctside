import { Component, OnInit } from '@angular/core';
import { ApiFinancialAccountService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-account-recharge',
  templateUrl: './account-recharge.component.html',
  styleUrls: ['./account-recharge.component.scss']
})
export class AccountRechargeComponent implements OnInit {

  public renderInfo: any = {};

  constructor(
    private apiFinancialAccountService: ApiFinancialAccountService
  ) {
    this.fetchRenderInfo();
  }
  /* asyncFetchFinancialAccountInfo */

  private fetchRenderInfo() {
    this.apiFinancialAccountService.asyncFetchFinancialAccountInfo().subscribe(res => {
      console.log(res)
      this.renderInfo = res.rel;
    })
  }

  ngOnInit() {
  }

}
