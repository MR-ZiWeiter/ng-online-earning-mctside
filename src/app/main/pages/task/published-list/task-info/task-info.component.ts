import { Component, Input, OnInit } from '@angular/core';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {

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
    this.apiTaskIndexService.asyncFetchOrderDetail({taskId}).subscribe(res => {
      this.orderInfo = res.rel;
    })
  }
}
