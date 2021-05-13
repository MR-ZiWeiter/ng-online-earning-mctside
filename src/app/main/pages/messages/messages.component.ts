import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiMessagesService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';

@Component({
  selector: 'swipe-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public renderInfo: any = {};

  public validateForm!: FormGroup;

  public platformConfig: any[] = [];

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  /* 类型选择 */
  public listOfSelection = [
    {
      text: '全部选择',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: '单数选择',
      onSelect: () => {
        this.renderInfoArray.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '双数选择',
      onSelect: () => {
        this.renderInfoArray.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  public checked = false;
  public indeterminate = false;
  public renderInfoArray: ReadonlyArray<any> = [];
  public setOfCheckedId = new Set<number>();

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private nzModalService: NzModalService,
    private apiMessagesService: ApiMessagesService
  ) {}

  public onSearchInfo() {
    this.renderConfig.loading = true;
    this.apiMessagesService.asyncFetchMessagesList({
      ...this.renderConfig,
      ...this.validateForm.value
    }).subscribe(res => {
      this.renderInfoArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    }, error => {
      this.renderConfig.loading = false;
    })
  }

  public onQueryParamsChange(params: NzTableQueryParams) {
    this.renderConfig.pageNum = params.pageIndex;
    this.onSearchInfo();
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.onSearchInfo();
  }

  /* 表单控制 */
  public updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  public onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  public onAllChecked(value: boolean): void {
    this.renderInfoArray.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  public onCurrentPageDataChange($event: ReadonlyArray<any>): void {
    this.renderInfoArray = $event;
    this.refreshCheckedStatus();
  }

  public refreshCheckedStatus(): void {
    this.checked = this.renderInfoArray.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.renderInfoArray.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
  /* END */

  /* 已读 */
  public openCheckMessagesInfo(renderInfo: any) {
    this.apiMessagesService.asyncUpdateMessagesInfo(renderInfo.id).subscribe(res => {
      this.systemService.presentToast('已标记为已读', 'success');
    })
  }

  /* 删除数据 */
  public deleteMessageInfo(renderInfo: any): void {
    this.apiMessagesService.asyncDeleteMessagesInfo(renderInfo.id).subscribe(res => {
      this.systemService.presentToast('删除成功', 'success');
    })
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      status: [1]
    });
  }

}
