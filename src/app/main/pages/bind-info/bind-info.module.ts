import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { CustomModel } from '../components/component.module';
import { BindInfoComponent } from './bind-info.component';
import { AhtionHomeComponent } from './components/ahtion-home/ahtion-home.component';
import { BankAhtionComponent } from './components/bank-ahtion/bank-ahtion.component';
import { BindWeChatComponent } from './components/bind-weChat/bind-weChat.component';
import { BindZfbComponent } from './components/bind-zfb/bind-zfb.component';
import { PhoneAhtionComponent } from './components/phone-ahtion/phone-ahtion.component';
import { RealNameAhtionComponent } from './components/real-name-ahtion/real-name-ahtion.component';


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
  // tslint:disable-next-line:max-line-length
  declarations: [BindInfoComponent , BindWeChatComponent , PhoneAhtionComponent , BindZfbComponent , BankAhtionComponent , AhtionHomeComponent , RealNameAhtionComponent]
})
export class BindInfoModule { }
