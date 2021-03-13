import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 导入页面 */
import { LoginPage } from './login/login.page';
// canActivate: [AuthGuard]
const routes: Routes = [
  { path: 'login', component: LoginPage }
];

const PagesRoutes = RouterModule.forChild(routes);

@NgModule({
  imports: [PagesRoutes],
  exports: [RouterModule]
})

export class PagesRoutesModule {}
