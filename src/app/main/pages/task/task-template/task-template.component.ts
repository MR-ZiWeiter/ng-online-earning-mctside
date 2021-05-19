import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IApiTempInfoModal } from 'src/app/core/model';
import { ApiReleaseService, ApiMerchantService } from 'src/app/core/modules/provider/api';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'swipe-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderInfoArray: Array<IApiTempInfoModal> = [];

  public platformConfig: any[] = [];

  public renderConfig: any = {
    pageNum: 1,
    pageSize: 20,
    total: 0,
    loading: true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private systemService: SystemService,
    private apiReleaseService: ApiReleaseService,
    private apiMerchantService: ApiMerchantService,
  ) {}

  /* 获取电商平台数据 */
  private fetchPlatformListInfo(fn?: Function) {
    this.apiMerchantService.asyncFetchPlatformListInfo().subscribe(res => {
      // console.log(res)
      this.platformConfig = res.rel;
      if (res.rel.length) {
        this.validateForm.addControl('platformId', new FormControl(res.rel[0].id));
      }
      fn && fn();
    }, error => {
      this.systemService.presentToast('数据错误,请联系管理员,谢谢', 'info');
    })
  }

  public onSearchInfo() {
    this.renderConfig.loading = true;
    this.apiReleaseService.asyncFetchTempList({
      ...this.renderConfig,
      ...this.validateForm.value
    }).subscribe(res => {
      this.renderInfoArray = res.rel;
      this.renderConfig.total = res.rel.length;
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

  public onCopyClipboardChange(URL: string) {
    navigator.clipboard.writeText(URL).then(() => {
      this.systemService.presentToast('已复制到剪切板', 'success');
    }).catch(() => {
      this.systemService.presentToast('请选择谷歌浏览器或者火狐浏览器', 'warning');
    })
  }

  /* 确认删除 */
  public openDeleteConfirm(info: any) {
    this.apiReleaseService.asyncFetchTempDeleteInfo({
      templateId: info.id
    }).subscribe(res => {
      // console.log(res);
      this.systemService.presentToast('删除成功!', 'success');
      this.onSearchInfo();
    })
  }

  public openPostTaskConfirm(info: any) {
    this.router.navigate(['/main/task/post-task', {tempID: info.id}]);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      platformId: [1],
      templateTitle: ['']
    });
    this.fetchPlatformListInfo();
  }
}
