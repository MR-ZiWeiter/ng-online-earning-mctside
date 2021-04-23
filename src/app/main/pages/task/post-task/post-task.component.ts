import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiReleaseService } from 'src/app/core/modules/provider/api';

/* 组件 */
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

@Component({
  selector: 'swipe-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent implements OnInit {

  public validateForm!: FormGroup;

  /* 选中模板的类型 */
  public tempSelected: any = null;
  /* 模板列表 */
  public tempDictArray: any[] = [];

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  /* Role 规则 */
  public roleConfig: any = {
    rule1: ['CREDIT_GRADE', 'AUTOMATIC_MARKING', 'BOOKMARK', 'COLLECTION_PURCHASED', 'CUSTOMER_SERVICE_CHAT', 'GENDER', 'AGE', 'PAYMENT_TYPE'],
    rule2: ['PRAISE_WAY', 'ADDITIONAL_REVIEW_WAY', 'GOODS_COMPARISON', 'BROWSE_PRODUCTS', 'WITH_GOODS', 'DELAY_TO_BUY_TIEM', 'SUPERADD'],
  };
  /* 数据模板渲染数据 */
  public taskTemp: any = {
    task1: [],
    task2: [],
    task3: []
  };

  /* 组件控制 */
  /* 组件控制 */

  @ViewChild(Step1Component)
  private step1Component!: Step1Component;

  @ViewChild(Step2Component)
  private step2Component!: Step2Component;

  @ViewChild(Step3Component)
  private step3Component!: Step3Component;

  constructor(
    private fb: FormBuilder,
    private apiReleaseService: ApiReleaseService
  ) {
    this.initalConfigInfo();
  }

  /* 初始化初始数据 */
  private initalConfigInfo() {
    this.apiReleaseService.asyncFetchTaskConfigInfo().subscribe(res => {
      // console.log(res);
      this.handlerTaskTempChange(res.rel);
    })
    this.apiReleaseService.asyncFetchTempDictList({
      pageNum: 1,
      pageSize: 200
    }).subscribe(res => {
      // console.log(res);
      this.tempDictArray = res.rel;
    })
    console.log(this.taskTemp)
  }

  /* 处理taskTemp */
  private handlerTaskTempChange(tempInfo: any) {
    const { task1, task2, task3 }: {[key: string]: any} = {task1: [], task2: [], task3: [] };
    tempInfo.map((item: any) => {
      if (item.userMatch) {
        task1.push(item);
      } else {
        task2.push(item);
      }
      // if (this.roleConfig.rule1.includes(item.code)) {
      //   task1.push(item);
      // } else if (this.roleConfig.rule2.includes(item.code)) {
      //   task2.push(item);
      // } else {
      //   task3.push(item);
      // }
    })
    this.taskTemp = {task1, task2, task3};
  }

  /* 选择模板点击下拉回调 */
  public selectTempChange(ev: any) {
    // console.log(ev);
    this.apiReleaseService.asyncFetchTempIdToInfo({
      templateId: ev
    }).subscribe(res => {
      console.log(res);
    })
  }

  /* 校验数据 deep 方式 */
  public deepCheckForm(formGroup: FormGroup|FormControl|FormArray|any) {
    if (formGroup instanceof FormGroup) {
      for (const i in formGroup.controls) {
        if (formGroup.controls[i] instanceof FormControl) {
          formGroup.controls[i].markAsDirty();
          formGroup.controls[i].updateValueAndValidity();
        } else {
          this.deepCheckForm(formGroup.controls[i]);
        }
      }
    } else if (formGroup instanceof FormArray) {
      for(let i = 0; i < formGroup.length; i ++) {
        this.deepCheckForm(formGroup.controls[i]);
      }
    } else {
      formGroup.markAsDirty();
      formGroup.updateValueAndValidity();
    }
  }

  submitForm(): void {
    /* 手动校验组件 */
    this.step1Component.checkComponentForm();
    this.step2Component.checkComponentForm();
    this.step3Component.checkComponentForm();
    // console.log(this.step1Component)
    this.deepCheckForm(this.validateForm)
    console.log(this.validateForm)
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      step1: [null, [Validators.required]],
      step2: [null, [Validators.required]],
      step3: [null, [Validators.required]],
      step4: [null, [Validators.required]],
    });
  }

}
