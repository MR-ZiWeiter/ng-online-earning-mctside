import { Observable, BehaviorSubject, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import { WorkIndexedDBService } from 'src/app/core/modules/provider/indexedDB/work-indexedDB.service';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  private settingsConfig: settingsConfig = {
    eyeCareMode: false
  };
  // 设置中间件
  private $settingsConfig: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private workIndexedDBService: WorkIndexedDBService) {
    this.workIndexedDBService.selectByIndex('system', 'systemTypeIndex', 'settings').subscribe((info) => {
      console.log('获取成功数据库数据---APP全局设置');
      console.log(info);
      if (!info || info.length === 0) {
        this.workIndexedDBService.insert('system', {
          id: parseInt((Math.random() * 1000000).toString(), 10),
          systemTypeIndex: 'settings',
          settings: this.settingsConfig
        }).subscribe(infos => {
          console.log(infos);
          this.settingsConfig.id = infos;
          this.setSettingsConfig({
            deep: false,
            value: this.settingsConfig
          });
        });
      } else {
        this.setSettingsConfig({
          deep: false,
          value: {...info[0].settings, id: info[0].id}
        });
      }
    });
  }
  public getSettingsConfig(): Observable<any> {
    return this.$settingsConfig.asObservable();
  }
  public setSettingsConfig(info: any): void {
    if (info.deep) {
      this.settingsConfig = info.value;
      this.$settingsConfig.next(info.value);
    } else {
      const cloneSettingsConfig = Object.assign({}, this.settingsConfig, info.value);
      this.settingsConfig = cloneSettingsConfig;
      this.$settingsConfig.next(cloneSettingsConfig);
    }
  }
  public setIndexedDBWithSettingsConfig(info: any): void {
    this.workIndexedDBService.selectByIndex('system', 'systemTypeIndex', 'settings').subscribe((infoArray) => {
      if (!infoArray || infoArray.length === 0) {
        this.workIndexedDBService.insert('system', {
          systemTypeIndex: 'settings',
          settings: info
        }).subscribe(infos => {
          console.log(infos);
        });
      } else {
        const cloneSettingsConfig = Object.assign({}, infoArray[0].settings, this.settingsConfig, info);
        this.setSettingsConfig({
          deep: false,
          value: cloneSettingsConfig
        });
        this.workIndexedDBService.update('system', {
          id: cloneSettingsConfig.id,
          systemTypeIndex: 'settings',
          settings: cloneSettingsConfig
        }).subscribe().unsubscribe();
      }
    });
  }
}
