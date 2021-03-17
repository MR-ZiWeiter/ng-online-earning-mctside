import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CustomCardComponent } from './custom-card/custom-card.component';

@NgModule({
  declarations: [
    CustomCardComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    CustomCardComponent
  ]
})
export class CustomModel { }
