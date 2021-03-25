import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FinancialComponent } from './financial.component';
import { FinancialRoutingModule } from './financial.routing.module';

/* Pages */
import { RechargeRecordComponent } from './recharge-record/recharge-record.component';
import { WithdrawalDetailsComponent } from './withdrawal-details/withdrawal-details.component';
import { FundingDetailsComponent } from './funding-details/funding-details.component';

@NgModule({
  imports: [
    CoreModule,
    FinancialRoutingModule
  ],
  declarations: [
    FinancialComponent,
    RechargeRecordComponent,
    WithdrawalDetailsComponent,
    FundingDetailsComponent
  ]
})
export class FinancialModule { }
