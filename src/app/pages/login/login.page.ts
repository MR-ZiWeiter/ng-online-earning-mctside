import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { SystemService } from 'src/app/core/services/system/system.service';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';
/* 初始变量 */
import { environment } from '@app/env';
@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginRegisterForm!: FormGroup;
  // tslint:disable-next-line:jsdoc-format
  /** 登陆页背景*/
  public loginBg = 'assets/images/pages/login/login-bg@2x.png';
  public imageCodeToken!: string;
  /* 验证码配置 */
  public smsConfig: any = {
    isFlat: false,
    time: 60,
    timer: null
  };
  // `${environment.API_URL}/open/kaptcha/image-code/${imageCodeToken}`
  public loginType: Array<any> = [
    { text: '账号密码登录', type: 'ACCOUNT_PASSWORD' },
    { text: '手机验证码登录', type: 'PHONE_VERIFICATION' },
  ];
  public set activeLoginType(n: string) {
    this.loginRegisterForm.controls['loginMode'].setValue(n);
    if (n === 'ACCOUNT_PASSWORD') {
      this.loginRegisterForm.addControl('imageCodeToken', new FormControl(null, [Validators.required]));
      this.loginRegisterForm.addControl('imageCode', new FormControl(null, [Validators.required]));
      /* 获取验证码 */
      this.switchImageCodeTokenEvent();
    } else {
      this.loginRegisterForm.removeControl('imageCode');
    }
  };
  public get activeLoginType() {
    return this.loginRegisterForm.value.loginMode
  };

  // 是否注册页面
  public register = false;
  public reset = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private systemService: SystemService,
    private apiUserAccountService: ApiUserAccountService
  ) {}

  ngOnInit(): void {
    // console.log('成功-欢迎来到网赚商户端登录');
    this.loginRegisterForm = this.fb.group({
      accountType: [3, [Validators.required]],
      identifier: [null, [Validators.required, Validators.pattern(/^[\d*]|[\u4e00-\u9fa5\_]$/)]],
      credential: [null, [Validators.required, Validators.pattern(/^[0-9a-z]{6,20}$/)]],
      loginMode: ['ACCOUNT_PASSWORD', [Validators.required]],
      imageCode: [null, [Validators.required]],
      imageCodeToken: [null, [Validators.required]],
      // qq: [null, [Validators.required]],
      // smsCode: [null, [Validators.required]],
      // wechat: [null, [Validators.required]],
      remember: [true]
    })
    /* 重载进入主页Main */
    if (this.userService.getToken !== null) {
      this.router.navigate(['/']);
    }
    /* 获取验证码 */
    this.switchImageCodeTokenEvent();
  }

  // 设置倒计时
  public settingTimeOutEvent(): void {
    this.smsConfig.isFlat = true;
    this.smsConfig.time = 60;
    this.smsConfig.timer = setInterval(() => {
      this.smsConfig.time--;
      if (this.smsConfig.time === 0) {
        clearInterval(this.smsConfig.timer);
        this.smsConfig.isFlat = false;
      }
    }, 1000);
  }

  /* 获取图形验证码 */
  public switchImageCodeTokenEvent() {
    const imageCodeToken = Math.random() * 999999999 | 0;
    this.loginRegisterForm.controls['imageCode'].setValue(null);
    this.loginRegisterForm.controls['imageCodeToken'].setValue(imageCodeToken);
    this.imageCodeToken = `${environment.API_URL}/open/kaptcha/image-code/${imageCodeToken}`;
    return this.imageCodeToken;
  }

  /* 切换 */
  public switchLoginType(info: any) {
    this.activeLoginType = info.type;
  }
  /* 单独校验密码 */
  public updateConfirmValidator(): void {
    if (this.loginRegisterForm.controls.check_credential) {
      /** wait for refresh value */
      Promise.resolve().then(() => this.loginRegisterForm.controls.check_credential.updateValueAndValidity());
    }
  }
  /* 校验密码 */
  private checkCredential = (control: FormControl) => {
    if (!control.value) {
      return { require: true }
    } else if (this.loginRegisterForm.controls['credential'].value === control.value) {
      return {}
    } else {
      return { confirm: true, error: true };
    }
  }
  /* 切换登录注册 */
  public toggleLoginOfRegister() {
    /* 改变控件组状态 */
    this.register = !this.register;
    this.activeLoginType = 'ACCOUNT_PASSWORD';
    this.reset = false;
    if (this.register) {
      this.loginRegisterForm.removeControl('imageCode');
      this.loginRegisterForm.removeControl('imageCodeToken');
      this.loginRegisterForm.addControl('check_credential', new FormControl(null, [Validators.required, this.checkCredential]))
      this.loginRegisterForm.addControl('nickname', new FormControl(null, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$|^[a-zA-Z0-9]{2,}$|/)]));
      this.loginRegisterForm.addControl('smsCode', new FormControl(null, [Validators.required]));
      this.loginRegisterForm.addControl('qq', new FormControl(null, [Validators.required]));
      this.loginRegisterForm.addControl('wechat', new FormControl(null, [Validators.required]));
    } else {
      this.loginRegisterForm.removeControl('nickname');
      this.loginRegisterForm.removeControl('smsCode');
      this.loginRegisterForm.removeControl('qq');
      this.loginRegisterForm.removeControl('wechat');
      this.loginRegisterForm.removeControl('check_credential');
    }
  }
  /* 获取手机验证码 */
  public fetchPhoneCodeInfo() {
    if (this.loginRegisterForm.controls['identifier'].valid) {
      this.apiUserAccountService.asyncFetchAccountSmsCode({
        mobile: this.loginRegisterForm.value.identifier
      }).subscribe(res => {
        this.settingTimeOutEvent();
        this.systemService.presentToast('发送验证码成功!', "success");
      })
    } else {
      this.systemService.presentToast('手机号错误，请核对后再试!');
    }
  }

  /* 提交 */
  public submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginRegisterForm.controls) {
      this.loginRegisterForm.controls[i].markAsDirty();
      this.loginRegisterForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.loginRegisterForm);
    if (this.loginRegisterForm.valid) {
      /* 登录 */
      this.apiUserAccountService[this.register ? 'asyncAccountRegister' : 'asyncAccountLogin'](this.loginRegisterForm.value).subscribe(res => {
        // console.log(res)
        if (!this.register) {
          this.systemService.presentToast(this.register ? '注册成功!' : '登录成功!', "success");
          this.router.navigate(['/']);
        } else {
          this.systemService.presentToast('您的注册申请已提交，我们将在1-3个工作日审核后将尽快为您开通商户账号。', 'success');
        }
      }, error => {
        // console.log(error);
        this.switchImageCodeTokenEvent();
      })
      /* 预处理登录成功后-后期重写至ApiService模块 */
      // this.userService.setAppToken(
      //   `${this.loginRegisterForm.value.username}|${this.loginRegisterForm.value.password}`
      // );
      // this.router.navigate(['/']);
    }
  }
}
4
