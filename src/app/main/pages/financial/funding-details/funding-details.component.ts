import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-funding-details',
  templateUrl: './funding-details.component.html',
  styleUrls: ['./funding-details.component.scss']
})
export class FundingDetailsComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet = [
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    },
    {
      time: '1977/02/11 13:25:56',
      countIn: '724750',
      countOut: '17279948119',
      intro: '司马余强',
      cover: '123456',
      code: '055804',
      remark: '湖南省'
    }
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
