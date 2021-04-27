import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  ApiUserAccountService,
  ApiSystemService,
  ApiMerchantService,
  ApiTaskIndexService,
  ApiReleaseService,
  ApiFinancialService,
  ApiFinancialAccountService,
  ApiAppealService
} from './index';

@NgModule({
  imports: [],
  providers: [
    ApiUserIndexService,
    ApiUserAccountService,
    ApiMerchantService,
    ApiSystemService,
    ApiTaskIndexService,
    ApiReleaseService,
    ApiFinancialService,
    ApiFinancialAccountService,
    ApiAppealService
  ]
})

export class ApiServiceModule {}
