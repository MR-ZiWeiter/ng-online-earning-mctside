import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 组件 */
import { AppealComponent } from './appeal.component';
import { MyAppealComponent } from './my-appeal/my-appeal.component';
import { NewAppealComponent } from './new-appeal/new-appeal.component';
import { ReceivedAppealComponent } from './received-appeal/received-appeal.component';

const routes: Routes = [
  {
    path: '',
    component: AppealComponent,
    children: [
      { path: '', redirectTo: 'new-appeal', pathMatch: 'full' },
      { path: 'my-appeal', component: MyAppealComponent },
      { path: 'new-appeal', component: NewAppealComponent },
      { path: 'received-appeal', component: ReceivedAppealComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppealRoutingModule {}
