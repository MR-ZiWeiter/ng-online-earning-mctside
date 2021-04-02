import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* 接口模块注入 */
import { ApiServiceModule } from './modules/provider/api/index.module';
/* 公共模块注入 */
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

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
import { RouterModule } from '@angular/router';
import { SwipeRadioComponent } from './modules/components/swipe-radio/swipe-radio.component';
import { SwipeGetCodeInputComponent } from './modules/components/swipe-get-code-input/swipe-get-code-input.component';
import { SwipeUploadComponent } from './modules/components/swipe-upload/swipe-upload.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ApiServiceModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzUploadModule,
    NzRadioModule,
    NzCascaderModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzModalModule,
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    NzTabsModule,
    NzCheckboxModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ApiServiceModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzInputNumberModule,
    NzCardModule,
    NzUploadModule,
    NzRadioModule,
    NzModalModule,
    NzSelectModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzTableModule,
    NzDividerModule,
    NzTabsModule,
    NzCheckboxModule,
    SwipeEyeCareModeComponent,
    SwipeLottieComponent,
    SwipeInputComponent,
    RouterModule,
    SwipeRadioComponent,
    SwipeGetCodeInputComponent,
    SwipeUploadComponent,
  ],
  declarations: [
    SwipeEyeCareModeComponent,
    SwipeLottieComponent,
    SwipeInputComponent,
    SwipeRadioComponent,
    SwipeGetCodeInputComponent,
    SwipeUploadComponent
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class CoreModule {
}
