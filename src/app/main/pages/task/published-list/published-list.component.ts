import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-published-list',
  templateUrl: './published-list.component.html',
  styleUrls: ['./published-list.component.scss']
})
export class PublishedListComponent implements OnInit {

  public validateForm!: FormGroup;

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
