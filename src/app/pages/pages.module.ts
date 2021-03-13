import { LoginPage } from './login/login.page';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { PagesRoutesModule } from './pages.routing.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CoreModule,
    PagesRoutesModule
  ],
  exports: []
})
export class PagesModule { }
