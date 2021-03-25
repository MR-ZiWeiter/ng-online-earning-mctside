import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {

  public validateForm!: FormGroup;

  public dataSet = [
    {
      index: 1,
      taskRegion: '淘宝天猫',
      image: '',
      tempName: '淘宝',
      shopkeeper: '猴三棍',
      website: 'https://lan…',
      price: '1200',
      praiseLimit: '物流收货后好评',
      createTime: '1990/05/05 20:19:35'
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
