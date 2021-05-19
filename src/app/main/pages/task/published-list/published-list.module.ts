import { NgModule } from "@angular/core";
import { CoreModule } from 'src/app/core/core.module';

import { PublishedListComponent } from './published-list.component';
import { TaskInfoComponent } from './task-info/task-info.component';
@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    PublishedListComponent,
    TaskInfoComponent
  ]
})

export class PublishedListModule {}
