import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiAppealService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-new-appeal',
  templateUrl: './new-appeal.component.html',
  styleUrls: ['./new-appeal.component.scss']
})
export class NewAppealComponent implements OnInit {

  public selectedValue = null;

    public validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
      type: 'info-circle',
      theme: 'twotone'
    };

    constructor(
      private systemService: SystemService,
      private apiAppealService: ApiAppealService,
      private fb: FormBuilder
    ) {}

    submitForm(): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      if (this.validateForm.valid) {
        this.apiAppealService.asyncFetchAppealNew(this.validateForm.value).subscribe(res => {
          this.systemService.presentToast('发起申诉成功', 'success');
        })
      } else {
        this.systemService.presentToast('请完善表单后提交', 'error');
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
        title: [null, [Validators.required]],
        target: [null, [Validators.required]],
        orderNo: [null, [Validators.required]],
        isLock: [false, [Validators.required]],
        description: [null, [Validators.required]],
        expecte: [null, [Validators.required]]
      });
    }

}
