import { NgModule } from "@angular/core";
import { CoreModule } from "src/app/core/core.module";
import { RouterModule } from '@angular/router';

/* 组件 */
import { AccountWithdrawalComponent } from "./account-withdrawal.component";
import { AlipayComponent } from "./alipay/alipay.component";
import { WechatComponent } from "./wechat/wechat.component";
import { BankComponent } from "./bank/bank.component";

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: AccountWithdrawalComponent }
    ])
  ],
  exports: [],
  declarations: [
    AccountWithdrawalComponent,
    AlipayComponent,
    WechatComponent,
    BankComponent
  ]
})

export class AccountWidthdrawalModule {}
