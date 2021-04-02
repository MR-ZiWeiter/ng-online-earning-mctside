import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';

import { UserService } from '../user/user.service';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { ApiUserAccountService } from 'src/app/core/modules/provider/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CoreToolsFunction {

  public isLoggedIn = false;

  public redirectUrl: string|null = null;

  constructor(
    private apiAccountService: ApiUserAccountService,
    private userService: UserService,
    private router: Router
  ) {
    super();
    this.userService.getWxAppToken().subscribe((info: any) => {
      if (info) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  // 重新获取Token 刷新Token
  public refreshToken() {
    setTimeout(() => {
      this.apiAccountService.asyncAccountRefreshToken({
        token: this.userService.token
      }).subscribe()

    }, 5000)
  }

  // 公共登录
  public openLogin(): void {
    this.router.navigate(['/pages/login']);
  }
  // 登出
  public logout(): void {
    this.userService.setUserBasicInfo(null);
    this.userService.setAppToken(null);
    this.router.navigate(['/pages/login']);
  }
}
