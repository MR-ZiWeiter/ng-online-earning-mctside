import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialComponent } from './financial.component';
import { FundingDetailsComponent } from './funding-details/funding-details.component';
import { RechargeRecordComponent } from './recharge-record/recharge-record.component';
import { WithdrawalDetailsComponent } from './withdrawal-details/withdrawal-details.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      { path: '', redirectTo: 'recharge-record', pathMatch: 'full' },
      { path: 'recharge-record', component: RechargeRecordComponent },
      { path: 'funding-details', component: FundingDetailsComponent },
      { path: 'withdrawal-details', component: WithdrawalDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FinancialRoutingModule {}