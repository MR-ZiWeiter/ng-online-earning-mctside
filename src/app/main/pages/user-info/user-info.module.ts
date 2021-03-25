import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CustomModel } from '../components/component.module';

import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserInfoComponent,
        children: [
          { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
          { path: 'basic-info', component: BasicInfoComponent },
          { path: 'change-pwd', component: ChangePwdComponent },
          { path: 'bind-info', loadChildren: () => import('./bind-info/bind-info.module').then(m => m.BindInfoModule) }
        ]
      }
    ]),
    NzSelectModule,
    NzDatePickerModule,
    CustomModel
  ],
  declarations: [
    UserInfoComponent,
    BasicInfoComponent,
    ChangePwdComponent
  ]
})
export class UserInfoModule { }
