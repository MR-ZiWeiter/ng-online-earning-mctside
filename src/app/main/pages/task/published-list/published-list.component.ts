import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';
import { NzModalService } from 'ng-zorro-antd/modal';

import { TaskInfoComponent } from './task-info/task-info.component';
@Component({
  selector: 'swipe-published-list',
  templateUrl: './published-list.component.html',
  styleUrls: ['./published-list.component.scss']
})
export class PublishedListComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 5,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private systemService: SystemService,
    private apiTaskIndexService: ApiTaskIndexService
  ) {}
// asyncFetchTaskList

  public fetchTaskList() {
    this.renderConfig.loading = true;
    this.apiTaskIndexService.asyncFetchTaskList({
      ...this.renderConfig,
      ...this.validateForm.value
    }).subscribe(res => {
      this.renderArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    })
  }

  public onPageIndexChange(ev: number) {
    // console.log(ev);
    this.renderConfig.pageNum = ev;
    this.fetchTaskList();
  }
  public onPageSizeChange(ev: number) {
    // console.log(ev);
    this.renderConfig.pageSize = ev;
    this.fetchTaskList();
  }

  public handlerRequire(renderInfo: any) {
    return renderInfo.taskRequire.map((m: any) => `${m.title}: ${m.selected}`).join('\n')
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.fetchTaskList();
  }

  /* 打开详情弹窗 */
  public openTaskDetail(renderInfo: any) {
    this.nzModalService.create({
      nzContent: TaskInfoComponent,
      nzWidth: 800,
      nzTitle: '任务详情',
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzFooter: null,
      nzComponentParams: {
        renderInfo
      },
      nzOnCancel: (e: any) => {
        console.log(e)
      },
      nzOnOk: (e: any) => {
        console.log(e)
      }
    })
  }
  public confirmChange(eventName: 'onDeleteTaskInfo'|'onUnshelveTaskInfo'|'onPutawayTaskInfo', renderInfo: any) {
    this[eventName](renderInfo);
  }
  /* 删除任务 */
  private onDeleteTaskInfo(renderInfo: any) {
    this.apiTaskIndexService.asyncFetchTaskDelete({
      taskId: renderInfo.id
    }).subscribe(res => {
      this.systemService.presentToast('删除任务成功', 'success');
      this.fetchTaskList();
    })
  }
  /* 下架任务 */
  private onUnshelveTaskInfo(renderInfo: any) {
    this.apiTaskIndexService.asyncFetchTaskUnshelve({
      taskId: renderInfo.id
    }).subscribe(res => {
      this.systemService.presentToast('下架任务成功', 'success');
      this.fetchTaskList();
    })
  }
  /* 上架任务 */
  private onPutawayTaskInfo(renderInfo: any) {
    this.apiTaskIndexService.asyncFetchTaskPutaway({
      taskId: renderInfo.id
    }).subscribe(res => {
      this.systemService.presentToast('上架任务成功', 'success');
      this.fetchTaskList();
    })
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      checkType: [1],
      checkValue: [''],
    });
    /* 处理数据 */
    this.fetchTaskList();
  }

}
