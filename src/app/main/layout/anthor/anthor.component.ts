import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'swipe-anthor',
  templateUrl: './anthor.component.html',
  styleUrls: ['./anthor.component.scss']
})
export class AnthorComponent implements OnInit {

  public anthorInfo: any;

  constructor(
    // private apiUserIndexService: ApiUserIndexService
    private userService: UserService
  ) {
    this.userService.getUserBasicInfo().subscribe(renderInfo => {
      if (renderInfo) {
        this.anthorInfo = renderInfo;
      }
    })
  }

  ngOnInit() {
  }

}
