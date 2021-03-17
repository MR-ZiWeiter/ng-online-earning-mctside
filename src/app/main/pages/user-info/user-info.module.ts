import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UserInfoComponent } from './user-info.component';
import { RouterModule } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CustomModel } from '../components/component.module';
@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserInfoComponent
      }
    ]),
    NzSelectModule,
    NzDatePickerModule,
    CustomModel
  ],
  declarations: [UserInfoComponent]
})
export class UserInfoModule { }
