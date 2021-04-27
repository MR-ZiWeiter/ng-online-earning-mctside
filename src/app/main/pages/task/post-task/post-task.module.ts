import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

/* 组件 */
import { PostTaskComponent } from './post-task.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';
import { Step6Component } from './step6/step6.component';
import { TaskWindowComponent } from './task-window/task-window.component';

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      { path: '', component: PostTaskComponent }
    ])
  ],
  // exports: [RouterModule],
  declarations: [
    PostTaskComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    TaskWindowComponent
  ]
})
export class PostTaskModule { }
