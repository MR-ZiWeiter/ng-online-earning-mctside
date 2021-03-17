import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'swipe-bind-zfb',
  templateUrl: './bind-zfb.component.html',
  styleUrls: ['./bind-zfb.component.scss']
})
export class BindZfbComponent implements OnInit {

  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [true],
    });
  }
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  constructor(private fb: FormBuilder, private msg: NzMessageService) {}


}
