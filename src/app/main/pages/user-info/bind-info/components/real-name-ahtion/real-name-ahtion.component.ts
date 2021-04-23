import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-real-name-ahtion',
  templateUrl: './real-name-ahtion.component.html',
  styleUrls: ['./real-name-ahtion.component.scss']
})
export class RealNameAhtionComponent implements OnInit {

  public validateForm!: FormGroup;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      realName: [null, [Validators.required]],
      idCardNum: [null, [Validators.required]],
      handPhotoUrl: [null, [Validators.required]],
      mainPhotoUrl: [null, [Validators.required]],
      reversePhotoUrl: [null, [Validators.required]],
    });
  }
  public submitForm(): void {
    // tslint:disable-next-line:forin
    // 账户密码登录

    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm);
  }

}
