import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderManagementComponent } from './order-management.component';

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: OrderManagementComponent }
    ])
  ],
  declarations: [OrderManagementComponent, OrderInfoComponent]
})
export class OrderManagementModule { }
