import { CoreModule } from 'src/app/core/core.module';
import { NgModule } from "@angular/core";

import { MessagesComponent } from './messages.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [MessagesComponent]
})

export class MessagesModule {}
