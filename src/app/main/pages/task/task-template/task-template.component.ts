import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IApiTempInfoModal } from 'src/app/core/model';
import { ApiReleaseService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {

  public validateForm!: FormGroup;

  public renderInfoArray: Array<IApiTempInfoModal> = [];

  constructor(
    private fb: FormBuilder,
    private apiReleaseService: ApiReleaseService
  ) {
    this.onSearchInfo()
  }

  public onSearchInfo() {
    this.apiReleaseService.asyncFetchTempList({
      pageNum: 1,
      pageSize: 20
    }).subscribe(res => {
      console.log(res)
      this.renderInfoArray = res.rel;
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
