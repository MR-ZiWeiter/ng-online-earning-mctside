import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task.routing.module';
import { OrderManagementModule } from './order-management/order-management.module';
import { PublishedListModule } from './published-list/published-list.module';

import { BoundShopComponent } from './bound-shop/bound-shop.component';
import { ChargeDetailsComponent } from './charge-details/charge-details.component';
// import { OrderManagementComponent } from './order-management/order-management.component';
import { TaskTemplateComponent } from './task-template/task-template.component';

@NgModule({
  imports: [
    CoreModule,
    TaskRoutingModule,
    OrderManagementModule,
    PublishedListModule
  ],
  declarations: [
    TaskComponent,
    BoundShopComponent,
    ChargeDetailsComponent,
    TaskTemplateComponent
  ]
})
export class TaskModule { }
