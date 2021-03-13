import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* 公共模块注入 */
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button'

/* ICON模块注入 */
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

/* 组件注入 */
import { SwipeEyeCareModeComponent } from './modules/components/swipe-eye-care-mode/swipe-eye-care-mode.component';
import { SwipeLottieComponent } from './modules/components/swipe-lottie/swipe-lottie.component';
import { SwipeInputComponent } from './modules/components/swipe-input/swipe-input.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    SwipeEyeCareModeComponent,
    SwipeLottieComponent,
    SwipeInputComponent
  ],
  declarations: [
    SwipeEyeCareModeComponent,
    SwipeLottieComponent,
    SwipeInputComponent
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class CoreModule {
}
