import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiFinancialService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-recharge-record',
  templateUrl: './recharge-record.component.html',
  styleUrls: ['./recharge-record.component.scss']
})
export class RechargeRecordComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiFinancialService: ApiFinancialService
  ) {
    this.fetchFinancialCapitalRechargeList();
  }

  public fetchFinancialCapitalRechargeList() {
    this.renderConfig.loading = true;
    this.apiFinancialService.asyncFetchFinancialCapitalRechargeList(this.renderConfig).subscribe(res => {
      this.renderArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    })
  }

  public onQueryParamsChange(params: NzTableQueryParams) {
    this.renderConfig.pageNum = params.pageIndex;
    this.fetchFinancialCapitalRechargeList();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      taskType: [null, [Validators.required]]
    });
  }

}
