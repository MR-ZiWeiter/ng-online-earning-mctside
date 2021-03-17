import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public validateForm!: FormGroup;
  // tslint:disable-next-line:jsdoc-format
  /** 登陆页背景*/
  public loginBg = 'assets/images/pages/login/login-bg@2x.png';
  public remember = true;
  public loginType: Array<any> = [
    { text: '账号密码登录', type: 0 },
    { text: '手机验证码登录', type: 1 },
  ];
  public activeLoginType = 0 ;
  // 是否注册页面
  public register = false;
  public reset = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // console.log('成功-欢迎来到网赚商户端登录');
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],
      // mobile: [null, [Validators.required]],
      // phoneCode: [null, [Validators.required]],
      userCode: [null, [Validators.required]],
      // QQNum: [null, [Validators.required]],
      // weChatNum: [null, [Validators.required]],
      remember: [true],
    });
    /* 重载进入主页Main */
    if (this.userService.getToken !== null) {
      this.router.navigate(['/']);
    }
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
    if (this.validateForm.valid) {
      /* 预处理登录成功后-后期重写至ApiService模块 */
      this.userService.setAppToken(
        `${this.validateForm.value.username}|${this.validateForm.value.password}`
      );
      this.router.navigate(['/']);
    }
  }
}
