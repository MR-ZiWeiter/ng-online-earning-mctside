import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swipe-bank-ahtion',
  templateUrl: './bank-ahtion.component.html',
  styleUrls: ['./bank-ahtion.component.scss']
})
export class BankAhtionComponent implements OnInit {
  public validateForm!: FormGroup;
  public values = [];
  public options = [];
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      mobile: [null, [Validators.required]],
      phoneCode: [null, [Validators.required]],
    });
  }
  onChanges(e: any) {
    console.log(e, '银行所在地');
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
