import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'swipe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  /* 登出 */
  public onLogout() {
    /* 暂时使用直接更改TOKEN方式，后期将改为调用APIServices */
    this.userService.setAppToken(null);
    this.router.navigate(['/'])
  }

}
