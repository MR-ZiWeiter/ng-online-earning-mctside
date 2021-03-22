import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task.routing.module';
import { PostTaskComponent } from './post-task/post-task.component';
import { BoundShopComponent } from './bound-shop/bound-shop.component';
import { ChargeDetailsComponent } from './charge-details/charge-details.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { PublishedListComponent } from './published-list/published-list.component';
import { TaskTemplateComponent } from './task-template/task-template.component';

@NgModule({
  imports: [
    CoreModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskComponent,
    PostTaskComponent,
    BoundShopComponent,
    ChargeDetailsComponent,
    OrderManagementComponent,
    PublishedListComponent,
    TaskTemplateComponent
  ]
})
export class TaskModule { }
