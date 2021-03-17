import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CustomModel } from '../components/component.module';
import { BindInfoComponent } from './bind-info.component';
import { BankAhtionComponent } from './components/bank-ahtion/bank-ahtion.component';
import { BindWeChatComponent } from './components/bind-weChat/bind-weChat.component';
import { BindZfbComponent } from './components/bind-zfb/bind-zfb.component';
import { PhoneAhtionComponent } from './components/phone-ahtion/phone-ahtion.component';


@NgModule({
  imports: [
    CoreModule,
    CustomModel,
    RouterModule.forChild([
      {
        path: '',
        component: BindInfoComponent
      }
    ])
  ],
  declarations: [BindInfoComponent, BindWeChatComponent , PhoneAhtionComponent , BindZfbComponent , BankAhtionComponent]
})
export class BindInfoModule { }
