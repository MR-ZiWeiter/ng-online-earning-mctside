import { NgModule } from '@angular/core';
import {
  ApiUserIndexService,
  UserAccountService,
  ApiTakeLookService,
  ApiAcademicService,
  ApiListenService,
  ApiPlayerService,
  ApiSearchService,
  ApiSuperVipService,
  ApiSystemService
} from './index';

@NgModule({
  imports: [],
  providers: [
    ApiUserIndexService,
    UserAccountService,
    ApiTakeLookService,
    ApiAcademicService,
    ApiListenService,
    ApiPlayerService,
    ApiSearchService,
    ApiSuperVipService,
    ApiSystemService
  ]
})

export class ApiServiceModule {}
