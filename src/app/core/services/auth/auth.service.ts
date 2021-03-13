import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';

import { UserService } from '../user/user.service';
import { CoreToolsFunction } from 'src/app/core/core.tools';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CoreToolsFunction {

  public isLoggedIn = false;

  public redirectUrl: string|null = null;

  constructor(
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

  // 公共登录
  public openLogin(): void {
    this.router.navigate(['/pages/account/login']);
  }
  // 登出
  public logout(): void {
    this.userService.setUserBasicInfo(null);
    this.userService.setAppToken(null);
    this.router.navigate(['/pages/account/login']);
  }
}
