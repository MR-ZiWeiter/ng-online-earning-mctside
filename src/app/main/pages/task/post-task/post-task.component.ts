import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ApiReleaseService } from 'src/app/core/modules/provider/api';

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

  constructor(
    private fb: FormBuilder,
    private apiReleaseService: ApiReleaseService
  ) {
    this.initalConfigInfo();
  }

  /* 初始化初始数据 */
  private initalConfigInfo() {
    this.apiReleaseService.asyncFetchTaskConfigInfo().subscribe(res => {
      console.log(res);
    })
    this.apiReleaseService.asyncFetchTempDictList({
      pageNum: 1,
      pageSize: 200
    }).subscribe(res => {
      // console.log(res);
      this.tempDictArray = res.rel;
    })
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      temp: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      norm: [null],
      price: [null, [Validators.pattern(/^\d+(\.\d+)?$/)]],
      agree: [false]
    });
  }

}
