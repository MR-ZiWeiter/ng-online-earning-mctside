import { FormGroup, FormControl, FormArray } from "@angular/forms";

export class CoreToolsFunction {
  constructor() { }
  /* EX */
  // public formatPx(px: number): number {
  //   return (px / 750) * window.screen.width;
  // }
  public formatTime(time: Date) {

  }

  /* 校验数据 deep 方式 */
  public deepCheckForm(formGroup: FormGroup|FormControl|FormArray|any) {
    if (formGroup instanceof FormGroup) {
      for (const i in formGroup.controls) {
        if (formGroup.controls[i] instanceof FormControl) {
          formGroup.controls[i].markAsDirty();
          formGroup.controls[i].updateValueAndValidity();
        } else {
          this.deepCheckForm(formGroup.controls[i]);
        }
      }
    } else if (formGroup instanceof FormArray) {
      for(let i = 0; i < formGroup.length; i ++) {
        this.deepCheckForm(formGroup.controls[i]);
      }
    } else {
      formGroup.markAsDirty();
      formGroup.updateValueAndValidity();
    }
  }
}
