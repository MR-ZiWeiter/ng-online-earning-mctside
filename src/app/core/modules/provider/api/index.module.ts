import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  ApiUserAccountService,
  ApiSuperVipService,
  ApiSystemService,
  ApiMerchantService,
  ApiIndexService,
  ApiReleaseService
} from './index';

@NgModule({
  imports: [],
  providers: [
    ApiUserIndexService,
    ApiUserAccountService,
    ApiSuperVipService,
    ApiMerchantService,
    ApiSystemService,
    ApiIndexService,
    ApiReleaseService
  ]
})

export class ApiServiceModule {}
