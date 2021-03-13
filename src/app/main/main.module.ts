import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CoreModule } from '../core/core.module';

/* 路由模块 */
import { MainPagesRoutingModule } from './main.routing.module';
/* 组件模块 */
import { LayoutModule } from './layout/layout.module';
/* 页面模块注入 */
import { TaskModule } from './pages/task/task.module';

@NgModule({
  imports: [
    CoreModule,
    NzLayoutModule,
    NzMenuModule,
    MainPagesRoutingModule,
    LayoutModule,

    /* 页面模块注入 */
    TaskModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
