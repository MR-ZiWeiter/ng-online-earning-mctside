import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CoreModule } from "src/app/core/core.module";
import { AccountRechargeComponent } from "./account-recharge.component";
import { AlipayComponent } from "./alipay/alipay.component";
import { BankComponent } from "./bank/bank.component";
import { WechatComponent } from "./wechat/wechat.component";

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: AccountRechargeComponent }
    ])
  ],
  exports: [],
  declarations: [
    AccountRechargeComponent,
    AlipayComponent,
    WechatComponent,
    BankComponent
  ]
})

export class AccountRechargeModule {}
