import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiFinancialService } from 'src/app/core/modules/provider/api';
// import { format } from 'date-fns';

@Component({
  selector: 'swipe-funding-details',
  templateUrl: './funding-details.component.html',
  styleUrls: ['./funding-details.component.scss'],
  providers: [DatePipe]
})
export class FundingDetailsComponent implements OnInit {

  public validateForm!: FormGroup;

  // private format?: any = format;

  public dataSet = [
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    }
  ];

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  public renderArray: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private apiFinancialService: ApiFinancialService
  ) {}

  public fetchFinancialCapitalList() {
    this.renderConfig.loading = true;
    this.apiFinancialService.asyncFetchFinancialCapitalList({
      ...this.renderConfig,
      ...this.validateForm.value
    }).subscribe(res => {
      this.renderArray = res.rel.list;
      this.renderConfig.total = res.rel.count;
      this.renderConfig.loading = false;
    })
  }

  public onQueryParamsChange(params: NzTableQueryParams) {
    this.renderConfig.pageNum = params.pageIndex;
    this.fetchFinancialCapitalList();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.fetchFinancialCapitalList();
  }

  /* 处理时间数据 */
  changeTimeFormat = (control: FormControl) => {
    // if (control.valid) {}
    if (control.value instanceof Date) {
      // console.log(this)
      this.validateForm.controls['createTime'].setValue(this.datePipe.transform(control.value, 'yyyy-MM-dd'));
      /* 当数据格式更改后进行查询一次数据 */
      // this.fetchFinancialCapitalList();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      createTime: ['', [this.changeTimeFormat]],
      outTradeNo: ['']
    });
    // this.fetchFinancialCapitalList();
  }

}
