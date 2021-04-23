import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  ApiUserAccountService,
  ApiSystemService,
  ApiMerchantService,
  ApiIndexService,
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
    ApiIndexService,
    ApiReleaseService,
    ApiFinancialService,
    ApiFinancialAccountService,
    ApiAppealService
  ]
})

export class ApiServiceModule {}
