import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-charge-details',
  templateUrl: './charge-details.component.html',
  styleUrls: ['./charge-details.component.scss']
})
export class ChargeDetailsComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet = [
    {
      region: '要求收藏店铺：0 元',
      price: '9'
    },
    {
      region: '1-50',
      price: '9'
    },
    {
      region: '1-50',
      price: '9'
    },
    {
      region: '1-50',
      price: '9'
    }
  ];

  public dataSet2 = [
    ['要求收藏店铺：0 元', '要求收藏加购：0 元', '要求假聊：0 元', '要求审核买号：1 元'],
    ['限制性别：0.5 元 ', '限制年龄：2 元', '要求买号常购类目：0 元'],
    ['定时任务：0 元', '要求货比数量：0 元', '要求浏览商品数量：0 元', '要求加购延迟购买：1 元']
  ];

  constructor(private fb: FormBuilder) {}

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
