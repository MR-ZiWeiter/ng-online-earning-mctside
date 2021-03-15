import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  public validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('成功-欢迎来到网赚商户端登录')
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    /* 重载进入主页Main */
    if (this.userService.getToken !== null) {
      this.router.navigate(['/'])
    }
  }

  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    if (this.validateForm.valid) {
      /* 预处理登录成功后-后期重写至ApiService模块 */
      this.userService.setAppToken(`${this.validateForm.value.username}|${this.validateForm.value.password}`)
      this.router.navigate(['/'])
    }
  }
}
