import { NgModule } from '@angular/core';
import { AppealComponent } from './appeal.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppealRoutingModule } from './appeal.routing.module';
/* 页面 */
import { MyAppealComponent } from './my-appeal/my-appeal.component';
import { ReceivedAppealComponent } from './received-appeal/received-appeal.component';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
/* 组件 */
import { AppealModalComponent } from './received-appeal/appeal-modal/appeal-modal.component';

@NgModule({
  imports: [
    CoreModule,
    AppealRoutingModule
  ],
  declarations: [
    AppealComponent,
    NewAppealComponent,
    MyAppealComponent,
    ReceivedAppealComponent,
    /* 组件 */
    AppealModalComponent
  ]
})
export class AppealModule { }
