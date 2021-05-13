import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CoreModule } from '../core/core.module';
/* 默认子页面 */
import { IndexComponent } from './pages/index/index.component';
/* 消息模块 */
import { MessagesModule } from './pages/messages/messages.module';

/* 路由模块 */
import { MainPagesRoutingModule } from './main.routing.module';
/* 组件模块 */
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CoreModule,
    NzLayoutModule,
    NzMenuModule,
    MainPagesRoutingModule,
    LayoutModule,
    MessagesModule
  ],
  declarations: [MainComponent, IndexComponent]
})
export class MainModule { }
