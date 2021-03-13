import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 页面注入 */
import { TaskComponent } from './task.component';

const routes: Routes = [
  { path: 'task', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TaskRoutingModule {}
