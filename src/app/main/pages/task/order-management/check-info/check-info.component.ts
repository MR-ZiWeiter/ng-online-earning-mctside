import { Component, Input, OnInit } from '@angular/core';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-check-info',
  templateUrl: './check-info.component.html',
  styleUrls: ['./check-info.component.scss']
})
export class CheckInfoComponent implements OnInit {

  public orderInfo: any = null;

  private _renderInfo: any = {};

  @Input()
  public set renderInfo(n: any) {
    this._renderInfo = n;
    if (n) {
      this.initalOrderInfo(n.id);
    }
  }
  public get renderInfo() {
    return this._renderInfo;
  }

  constructor(
    private apiTaskIndexService: ApiTaskIndexService
  ) { }

  ngOnInit() {}

  private initalOrderInfo(taskId: string) {
    this.apiTaskIndexService.asyncFetchCheckInfo({taskId}).subscribe(res => {
      this.orderInfo = res.rel;
    })
  }

}
