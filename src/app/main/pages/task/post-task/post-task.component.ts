import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiReleaseService } from 'src/app/core/modules/provider/api';

/* 组件 */
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';
import { Step6Component } from './step6/step6.component';

@Component({
  selector: 'swipe-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent extends CoreToolsFunction implements OnInit {

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

  @ViewChild(Step4Component)
  private step4Component!: Step4Component;

  @ViewChild(Step5Component)
  private step5Component!: Step5Component;

  @ViewChild(Step6Component)
  private step6Component!: Step6Component;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private systemService: SystemService,
    private apiReleaseService: ApiReleaseService
  ) {
    super();
    // console.log(activatedRoute)
    activatedRoute.params.subscribe(renderInfo => {
      if (renderInfo.tempID) {
        this.selectTempChange(renderInfo.tempID);
      }
    })
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
    })
    this.taskTemp = {task1, task2, task3};
  }

  /* 选择模板点击下拉回调 */
  public selectTempChange(ev: any) {
    // console.log(ev);
    this.apiReleaseService.asyncFetchTempIdToInfo({
      templateId: ev
    }).subscribe(res => {
      // console.log(res);
      const cloneReSult = this.handerResultTempChange(res.rel);
      // console.log(cloneReSult)
      this.validateForm.controls['step1'].setValue(cloneReSult);
      this.validateForm.controls['step2'].setValue(cloneReSult);
      this.validateForm.controls['step3'].setValue(cloneReSult);
      this.validateForm.controls['step4'].setValue(cloneReSult);
      this.validateForm.controls['step5'].setValue(cloneReSult);
      this.validateForm.controls['step6'].setValue(cloneReSult);

      // console.log(this.validateForm)
    })
  }

  /* 处理模板回填数据 由于后台返回数据模型不一致 所以需要单独处理数据 */
  private handerResultTempChange(renderInfo: any) {
    const cloneResult: any = {};
    for (let key in renderInfo) {
      if (key.includes('labels')) {
        cloneResult['labels'] = renderInfo[key];
      } else if (key.includes('Vo')) {
        if (Object.prototype.toString.call(renderInfo[key]) === '[object Object]') {
          cloneResult[key.replace(/Vo/g, 'Form')] = this.handerResultTempChange(renderInfo[key])
        } else {
          cloneResult[key.replace(/Vo/g, 'Form')] = renderInfo[key];
        }
      } else {
        cloneResult[key] = renderInfo[key];
      }
    }
    return cloneResult;
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

  public submitForm(): void {
    /* 手动校验组件 */
    this.step1Component.checkComponentForm();
    this.step2Component.checkComponentForm();
    this.step3Component.checkComponentForm();
    this.step4Component.checkComponentForm();
    this.step5Component.checkComponentForm();
    this.step6Component.checkComponentForm();
    // console.log(this.step1Component)
    this.deepCheckForm(this.validateForm)
    // console.log(this.validateForm)
    if (this.validateForm.valid) {
      let submitForm: any = {};
      for(const key in this.validateForm.value) {
        // Object.assign(submitForm, this.validateForm.value[key]);
        submitForm = this.deepFusinObject(submitForm, this.validateForm.value[key]);
      }
      // console.log(submitForm)
      let commission = 0;
      submitForm.requiresForms.map((item: any) => {
        switch(item.tagType) {
          case 2:
          case 3:
            item.requiresRuleItemVos.some((childItem: any) => {
              if (childItem.id === item.selected) {
                commission += childItem.fees
                return true
              }
              return false
            })
            break;
          case 4:
            item.requiresRuleItemVos.map((childItem: any) => {
              if (item.selected.include(childItem.id)) {
                commission += childItem.fees
              }
            })
            break;
        }
      })
      // console.log(commission)
      commission = (commission + submitForm.goodsForm.unitPrice * submitForm.goodsForm.quantity * 100 + submitForm.baseFess + submitForm.superaddFees * 100) * submitForm.businessTaskOriginalBaseForm.taskQuantity;
      submitForm['commission'] = commission;
      this.apiReleaseService.asyncPostMewTaskInfo(submitForm).subscribe(res => {
        this.systemService.presentToast('发布任务成功', 'success');
        this.router.navigate(['/main/task/published-list']);
      })
    } else {
      this.systemService.presentToast('请完善表单后再试，谢谢配合', 'info');
    }
  }

  public openResetForm() {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      step1: [null, [Validators.required]],
      step2: [null, [Validators.required]],
      step3: [null, [Validators.required]],
      step4: [null, [Validators.required]],
      step5: [null, [Validators.required]],
      step6: [null, [Validators.required]],
    });
  }

}
