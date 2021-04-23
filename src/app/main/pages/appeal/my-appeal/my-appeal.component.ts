import { ApiAppealService } from './../../../../core/modules/provider/api/appeal/index.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'swipe-my-appeal',
  templateUrl: './my-appeal.component.html',
  styleUrls: ['./my-appeal.component.scss']
})
export class MyAppealComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderConfig: any = {
    checkType: 1,
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
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
}
