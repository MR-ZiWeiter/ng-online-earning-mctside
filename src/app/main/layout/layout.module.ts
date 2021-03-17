import { NgModule } from "@angular/core";
import { CoreModule } from './../../core/core.module';

/* 组件 */
import { MenuComponent } from './menu/menu.component';
import { AnthorComponent } from './anthor/anthor.component';
import { HeaderComponent } from "./header/header.component";

import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  imports: [
    CoreModule,
    NzMenuModule
  ],
  exports: [
    HeaderComponent,
    AnthorComponent,
    MenuComponent
  ],
  declarations: [
    HeaderComponent,
    AnthorComponent,
    MenuComponent
  ]
})

export class LayoutModule {}
