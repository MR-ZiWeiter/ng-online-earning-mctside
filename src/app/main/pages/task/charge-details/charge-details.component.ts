import { PricePipe } from './../../../../core/pipes/price.pipe';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiTaskIndexService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-charge-details',
  templateUrl: './charge-details.component.html',
  styleUrls: ['./charge-details.component.scss'],
  providers: [PricePipe]
})
export class ChargeDetailsComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet: any[] = [];

  public dataSet2 = [
    ['要求收藏店铺：0 元', '要求收藏加购：0 元', '要求假聊：0 元', '要求审核买号：1 元'],
    ['限制性别：0.5 元 ', '限制年龄：2 元', '要求买号常购类目：0 元'],
    ['定时任务：0 元', '要求货比数量：0 元', '要求浏览商品数量：0 元', '要求加购延迟购买：1 元']
  ];

  constructor(
    private fb: FormBuilder,
    private pricePipe: PricePipe,
    private apiTaskIndexService: ApiTaskIndexService
  ) {
    this.initalBaseInfo();
    this.initalpAdditionalInfo();
  }

  /* fetch 获取基础基础配置 */
  private initalBaseInfo() {
    this.apiTaskIndexService.asyncFetchTaskBasePrice().subscribe(res => {
      // console.log(res)
      const renderArray = [];
      const contentLength = Math.ceil(res.rel.length / 2);
      for (let i = 0; i < contentLength; i++) {
        renderArray.push({
          region: res.rel[i * 2].title,
          price: res.rel[i * 2].fees,
          region1: res.rel[i * 2 + 1].title,
          price1: res.rel[i * 2 + 1].fees
        })
      }
      this.dataSet = renderArray;
    })
  }

  private initalpAdditionalInfo() {
    this.apiTaskIndexService.asyncFetchTaskAdditionalPrice().subscribe(res => {
      // console.log(res)
      const renderArray: any[] = [];
      let groupArray: any[] = [];
      res.rel.map((item: any) => {
        groupArray.push(`${item.title}: ${this.pricePipe.transform(item.fees)}元`)
        if (groupArray.length === 4) {
          renderArray.push(groupArray)
          groupArray = [];
        }
      })
      // console.log(renderArray)
      this.dataSet2 = renderArray;
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      taskType: [null, [Validators.required]]
    });
  }

}
