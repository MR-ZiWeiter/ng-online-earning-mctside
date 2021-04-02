import { LoginPage } from './login/login.page';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { PagesRoutesModule } from './pages.routing.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Error404Component } from './error/404/404.component';
@NgModule({
  declarations: [
    LoginPage,
    Error404Component,
  ],
  imports: [
    CoreModule,
    PagesRoutesModule,
    NzCheckboxModule
  ],
  exports: []
})
export class PagesModule { }
