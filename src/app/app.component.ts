import { Router } from '@angular/router';
import { Component } from '@angular/core';
// 导入弹窗组件
import { WorkIndexedDBService } from './core/modules/provider/indexedDB/work-indexedDB.service';
import { LoggerService } from './core/modules/provider/logger/logger.service';
import { UserService } from './core/services/user/user.service';
import { ApiUserIndexService } from './core/modules/provider/api';
import { SettingsService } from './core/services/settings/settings.service';

import vConsole from 'vconsole';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = '商家服务';
  private vconsole = vConsole;

  public isWebView: boolean = false;

  public settingConfig = {
    eyeCareMode: false
  };

  public mode = 'ios';

  constructor(
    private router: Router,
    private workIndexedDBService: WorkIndexedDBService,
    private logger: LoggerService,
    private settingsService: SettingsService,
    private userService: UserService,
    private apiUserIndexService: ApiUserIndexService
  ) {
    // const vconsole = new this.vconsole();
    this.initializeApp();
    // 初始化数据库
    this.workIndexedDBService.open()
      .subscribe(db => {
        this.logger.log(db);
        this.settingsService.getSettingsConfig().subscribe((info) => {
          console.log(info);
          if (info) {
            this.settingConfig = { ...this.settingConfig, ...info };
          }
        });
      }, err => {
        this.logger.log(err);
      });
    // 监听WxAppToken回调处理用户信息
    this.userService.getWxAppToken().subscribe((info: string|null) => {
      // console.log(info);
      if (info && info !== 'null' && info !== 'undefined') {
        // 注释服务协议
        // const serviceRule = localStorage.getItem('WxAppServiceRule');
        // if (!serviceRule) {
        //   // 服务协议
        //   this.serviceAgreementPresentModal();
        // }
        this.apiUserIndexService.asyncFetchBasicInfo().subscribe(res => res, err => err).unsubscribe();
      }
    });
  }

  public onMainActivate(ev: Event | any): void {
    this.setWxAppTitle(ev.title);
    console.log(ev);
    console.log('当前为主路由：' + ev.checkedTabsName);
    this.isWebView = false;
  }
  public onMainDeactivate(ev: Event | any): void {
    console.log(ev);
    console.log('退出主路由：' + ev.checkedTabsName);
  }
  public onPopupActivate(ev: Event | any): void {
    console.log(ev);
    this.isWebView = true;
    console.log('当前为附属路由：' + ev.activatedRoute.outlet);
  }
  public onPopupDeactivate(ev: Event | any): void {
    console.log(ev);
    console.log('退出附属路由：' + ev.activatedRoute.outlet);
  }

  // 设置标题
  public setWxAppTitle(title: string) {
    document.title = title || '网赚-用户端';
  }

  async serviceAgreementPresentModal() {
    // const modal = await this.modalController.create({
    //   component: ServiceAgreementComponent,
    //   cssClass: 'service-agreement-component-modal-custom'
    // });
    // return await modal.present();
  }

  initializeApp() {
  }

  globalTouchMoveEvent(ev: Event) {
    // ev.preventDefault();
    ev.stopPropagation();
  }
}
