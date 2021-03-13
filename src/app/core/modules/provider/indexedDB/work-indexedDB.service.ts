import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoggerService } from './../logger/logger.service';
import { storeConfig } from './store';
import { environment } from '@app/env';

@Injectable({
  providedIn: 'root'
})
export class WorkIndexedDBService {

  // Indexed DB兼容
  // @ts-ignore
  private indexedDB: any = window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB;
  private name: string;
  private version: number;
  private db: any;
  private privateStoreConfig: any[];

  constructor(private logger: LoggerService) {
    this.name = environment.NAME;
    this.version = environment.VERSION;
    this.privateStoreConfig = storeConfig;
  }

  // 打开并创建数据库
  public open(): Observable<any> {
    return new Observable<any>((observer: { next: (arg0: any) => void; error: (arg0: any) => void; }) => {
      this.logger.log(this.indexedDB, this.name, this.version);
      // 打开indexedDB
      const req = this.indexedDB.open(this.name, this.version);
      // 成功打开DB回调
      req.onsuccess = (ev: any) => {
        this.db = ev.target.result;
        console.log('数据库打开并连接成功');
        observer.next(this.db);
      };
      // 打开失败后的回调
      req.onerror = (err: any) => {
        observer.error(err);
      };
      // 当打开新数据库时
      req.onupgradeneeded = (ev: any) => {
        // 如果是新数据库时 清空旧的
        this.db = ev.target.result;
        const storeNames = this.db.objectStoreNames;
        if (storeNames && storeNames.length > 0) {
          storeNames.map((item: any) => {
            this.db.deleteObjectStore(item);
            this.logger.log('deleteObjectStore', item);
          });
        }
        // 创建数据库表
        this.createDB();
        this.logger.log('正在创建数据库');
      };
    });
  }

  // 关闭数据库
  public close(): void {
    this.db.close();
  }

  // 删除数据库
  public deleteDB(): Observable<any> {
    return new Observable<any>((observer: { next: () => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          // 关闭连接
          this.close();

          const req = this.indexedDB.deleteDatabase(this.name);

          req.onsuccess = (ev: Event) => {
            this.db = null;
            observer.next();
          };

          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 添加数据
  // 注意：使用事务来操作比较快
  public insert(
    storeName: string,
    data: any
  ): Observable<any> {
    return new Observable<any>((observer: { next: (arg0: any) => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.add(data);
          console.log(req);
          req.onsuccess = (ev: Event) => {
            observer.next(req.result);
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 批量添加数据
  public batchInsert(
    storeName: string,
    data: any[]
  ): Observable<any> {
    return new Observable((observer: { next: () => void; error: (arg0: Event) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          if (!data || data.length === 0) {
            observer.next();
          }
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);

          data.forEach(row => {
            store.add(row);
          });

          transaction.oncomplete = observer.next();
          transaction.onerror = (err: Event) => {
            this.logger.log('添加' + storeName + '表数据失败', err);
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 删除数据
  public workdelete(
    storeName: string,
    keyValue: any
  ): Observable<any> {
    return new Observable((observer: { next: () => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);

          const req = store.delete(keyValue);

          req.onsuccess = (ev: Event) => {
            observer.next();
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 清楚全部数据
  public clearAllData(): Observable<any> {
    return new Observable((observer: { next: (arg0: Event | undefined) => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const req = indexedDB.deleteDatabase(this.name);
          // alert(req);
          // console.log(req)
          req.onsuccess = (ev: Event) => {
            observer.next(ev);
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
          observer.next(undefined);
        }
      }, 100);
    });
  }

  // 清空数据
  public clear(
    storeName: string
  ): Observable<any> {
    return new Observable<any>((observer: { next: () => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);

          const req = store.clear();

          req.onsuccess = (ev: Event) => {
            observer.next();
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 更新数据
  public update(
    storeName: string,
    data: any
  ): Observable<any> {
    return new Observable<any>((observer: { next: () => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);

          const req = store.put(data);

          req.onsuccess = (ev: Event) => {
            observer.next();
          };

          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 根据Key取得数据
  public selectByKey(
    storeName: string,
    keyValue: any
  ): Observable<any> {
    return new Observable<any>((observer: { next: (arg0: any) => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);

          const req = store.get(keyValue);

          req.onsuccess = () => {
            observer.next(req.result);
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 100);
    });
  }

  // 根据索引取得数据
  public selectByIndex(
    storeName: string,
    indexName: string,
    indexValue: any
  ): Observable<any[]> {
    return new Observable<any[]>((observer: { next: (arg0: any[]) => void; error: (arg0: any) => void; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          // console.log(this.db, storeName);
          clearInterval(interval);
          const transaction = this.db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const index = store.index(indexName);

          const req = index.openCursor(indexValue);
          const result: any[] = new Array<any>();
          req.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              result.push(cursor.value);
              cursor.continue();
            } else {
              observer.next(result);
            }
          };
          req.onerror = (err: any) => {
            observer.error(err);
          };
        }
      }, 1000);
    });
  }

  // 批量合并数据
  public batchMerge(
    storeName: string,
    data: any[],
    delFlagColName?: string,

    delFlagColName2?: string

  ): Observable<any> {
    return new Observable<null>((observer: { next: () => void; error: () => any; }) => {
      const interval = setInterval(() => {
        if (this.db) {
          clearInterval(interval);
          if (!data || data.length === 0) {
            observer.next();
          }

          const transaction = this.db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);

          data.forEach(row => {
            // if () {
            //   const keyPath = store.keyPath;
            //   let keyValue: any;
            //   if (typeof keyPath === 'string') {
            //     keyValue = row[keyPath];
            //   } else {
            //     keyValue = new Array();
            //     keyPath.forEach(key => {
            //       keyValue.push(row[key]);
            //     });
            //   }
            //   store.delete(keyValue);
            // } else {
            //   store.put(row);
            // }
          });

          transaction.oncomplete = observer.next();
          transaction.onerror = observer.error();
        }
      }, 100);
    });
    // .catch((error) => {
    //   console.error('更新' + storeName + '表数据失败', error);
    //   return Observable.reject(error);
    // });
  }

  // 数据库初始化处理
  private createDB(): void {
    // this.createConfigInfo();
    for (const t in this.privateStoreConfig) {
      if (!this.db.objectStoreNames.contains(this.privateStoreConfig[t].name)) {
        const objectStore = this.db.createObjectStore(this.privateStoreConfig[t].name, {
          keyPath: this.privateStoreConfig[t].key,
          autoIncrement: true
        });
        this.privateStoreConfig[t].cursorIndex.forEach((item: { name: any; unique: any; }) => {
          objectStore.createIndex(item.name, item.name, {
            unique: item.unique
          });
        });
      }
    }
  }

  // 创建系统配置表及索引
  // private createConfigInfo(): void {
  //   const store = this.db.createObjectStore(
  //     'ConfigInfo',
  //     { keyPath: 'key' }
  //   );
  // }

  // 创建组织表及索引
  // private createStoreOrgInfo(): void {
  //   let store = this.db.createObjectStore(
  //     'OrgInfo',
  //     { keyPath: 'orgId' }
  //   );

  //   store.createIndex(
  //     'parentOrgIdIndex',
  //     ['parentOrgId', 'displayOrder'],
  //     { unique: false }
  //   );
  // }

}
