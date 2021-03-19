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
    private userService: UserService
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      mobile: [null, [Validators.required]],
      phoneCode: [null, [Validators.required]],
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
    console.log(this.validateForm);

    
  }

}
