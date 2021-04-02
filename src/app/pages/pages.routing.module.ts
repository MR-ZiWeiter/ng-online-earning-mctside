import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error/404/404.component';

/* 导入页面 */
import { LoginPage } from './login/login.page';
// canActivate: [AuthGuard]
const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '404', component: Error404Component }
];

const PagesRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [PagesRoutes],
  exports: [RouterModule]
})

export class PagesRoutesModule {}
