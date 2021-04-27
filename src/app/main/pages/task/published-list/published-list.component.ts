import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-published-list',
  templateUrl: './published-list.component.html',
  styleUrls: ['./published-list.component.scss']
})
export class PublishedListComponent implements OnInit {

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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.fetchTaskList();
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
