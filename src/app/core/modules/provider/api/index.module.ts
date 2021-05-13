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
  ApiAppealService,
  ApiMessagesService
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
    ApiAppealService,
    ApiMessagesService
  ]
})

export class ApiServiceModule {}
