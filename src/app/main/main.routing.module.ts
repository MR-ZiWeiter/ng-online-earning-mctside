import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'task', loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule) },
      { path: 'financial', loadChildren: () => import('./pages/financial/financial.module').then(m => m.FinancialModule) },
      { path: 'user-info', loadChildren: () => import('./pages/user-info/user-info.module').then(m => m.UserInfoModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainPagesRoutingModule {}

