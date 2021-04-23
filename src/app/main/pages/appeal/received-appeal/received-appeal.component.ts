import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppealModalComponent } from './appeal-modal/appeal-modal.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiAppealService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-received-appeal',
  templateUrl: './received-appeal.component.html',
  styleUrls: ['./received-appeal.component.scss']
})
export class ReceivedAppealComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderConfig: any = {
    checkType: 2,
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private nzModalService: NzModalService,
    private apiAppealService: ApiAppealService
  ) {
    // this.fetchAppealList();
  }

  public fetchAppealList() {
    this.renderConfig.loading = true;
    this.apiAppealService.asyncFetchAppealListInfo(this.renderConfig).subscribe(res => {
      this.renderArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    })
  }

  public onQueryParamsChange(params: NzTableQueryParams) {
    this.renderConfig.pageNum = params.pageIndex;
    this.fetchAppealList();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      taskType: [null, [Validators.required]]
    });
  }

  /* 打开详情弹窗 */
  public openAppealDetail(info: {[x: string]: any}) {
    this.nzModalService.create({
      nzContent: AppealModalComponent,
      nzWidth: 657,
      nzTitle: '我收到的申诉',
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzFooter: null,
      nzComponentParams: {
        renderInfo: info
      },
      nzOnCancel: (e: any) => {
        console.log(e)
      },
      nzOnOk: (e: any) => {
        console.log(e)
      }
    })
  }

}
