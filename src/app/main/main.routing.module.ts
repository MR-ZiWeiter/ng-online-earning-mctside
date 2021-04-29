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
      { path: 'appeal', loadChildren: () => import('./pages/appeal/appeal.module').then(m => m.AppealModule) },
      { path: 'financial', loadChildren: () => import('./pages/financial/financial.module').then(m => m.FinancialModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainPagesRoutingModule {}

