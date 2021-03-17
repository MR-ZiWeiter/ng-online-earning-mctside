import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'swipe-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public cindex = 1;
   a = 3 ;
  private set index(n: number) {
    this.cindex = n + 1;
  }
  private get index(): number {
    return this.cindex;
  }

  public c: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.c = this.userService.getWxAppToken().subscribe(res => {
    //   console.log(res);
    // });

    // setInterval(() => {
    //   this.index++;
    //   this.userService.setAppToken('123456789' + this.cindex);
    // }, 1000);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.c.unsubscribe();
  }

}
