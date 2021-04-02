import { Component, OnInit } from '@angular/core';
import { ApiUserAccountService, ApiUserIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-anthor',
  templateUrl: './anthor.component.html',
  styleUrls: ['./anthor.component.scss']
})
export class AnthorComponent implements OnInit {

  public anthorInfo: any;

  constructor(
    private apiUserIndexService: ApiUserIndexService
  ) { }

  ngOnInit() {
    this.apiUserIndexService.asyncFetchUserHomeInfo().subscribe(res => {
      // console.log(res);
      this.anthorInfo = res.rel;
    })
  }

}
