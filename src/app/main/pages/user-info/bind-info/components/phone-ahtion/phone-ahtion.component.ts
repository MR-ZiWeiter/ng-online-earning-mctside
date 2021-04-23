import { SystemService } from 'src/app/core/services/system/system.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'swipe-phone-ahtion',
  templateUrl: './phone-ahtion.component.html',
  styleUrls: ['./phone-ahtion.component.scss']
})
export class PhoneAhtionComponent implements OnInit {
  public validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      mobile: [null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$/)]],
      smsCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });
  }
  public submitForm(): void {
    // tslint:disable-next-line:forin
    // 账户密码登录

    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.validateForm);
    if (this.validateForm.valid) {

    } else {
      this.systemService.presentToast('请完善表单后提交', 'error');
    }
  }

}
