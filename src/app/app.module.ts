import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// 注入网络请求
import { HttpService } from './core/modules/provider/http/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LarkHttpInterceptor } from './core/modules/provider/http/interceptor';
import { RequestPreviewHandler } from './core/modules/provider/http/handler/request-preview-handler';
import { RequestExceptionHandler } from './core/modules/provider/http/handler/request-exception-handler';
import { RequestProcessedHandler } from './core/modules/provider/http/handler/request-processed-handler';


// 缓存数据库加载 indexedDB
import { WorkIndexedDBService } from './core/modules/provider/indexedDB/work-indexedDB.service';

/* 页面主模块 */
import { MainModule } from './main/main.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NzMessageModule,
    /* 网络服务 */
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    /* 主页面模块 */
    MainModule
  ],
  providers: [
    HttpService,
    WorkIndexedDBService,
    {provide: RequestPreviewHandler},
    {provide: RequestProcessedHandler},
    {provide: RequestExceptionHandler},
    {provide: HTTP_INTERCEPTORS, useClass: LarkHttpInterceptor, multi: true},
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
