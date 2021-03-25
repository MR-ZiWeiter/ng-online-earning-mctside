import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 页面注入 */
import { TaskComponent } from './task.component';
// import { PostTaskComponent } from './post-task/post-task.component';
import { BoundShopComponent } from './bound-shop/bound-shop.component';
import { ChargeDetailsComponent } from './charge-details/charge-details.component';
// import { OrderManagementComponent } from './order-management/order-management.component';
import { TaskTemplateComponent } from './task-template/task-template.component';
import { PublishedListComponent } from './published-list/published-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      { path: '', redirectTo: 'post-task', pathMatch: 'full' },
      { path: 'post-task', loadChildren: () => import('./post-task/post-task.module').then(m => m.PostTaskModule) },
      { path: 'bound-shop', component: BoundShopComponent },
      { path: 'charge-details', component: ChargeDetailsComponent },
      { path: 'order-management', loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule) },
      { path: 'task-template', component: TaskTemplateComponent },
      { path: 'published-list', component: PublishedListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaskRoutingModule {}
