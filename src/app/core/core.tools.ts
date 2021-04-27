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

  /* 深度融合对象数据 */
  public deepFusinObject(firstFusion: {[x: string]: any}, cloneFusion: {[x: string]: any}): {[x: string]: any} {
    for(const key in cloneFusion) {
      if (firstFusion[key]) {
        if (Object.prototype.toString.call(firstFusion[key]) === Object.prototype.toString.call(cloneFusion[key])) {
          if (Object.prototype.toString.call(firstFusion[key]) === "[object Array]") {
            firstFusion[key] = firstFusion[key].concat(cloneFusion[key]);
          } else if (Object.prototype.toString.call(firstFusion[key]) === "[object Object]") {
            firstFusion[key] = this.deepFusinObject(firstFusion[key], cloneFusion[key]);
          } else {
            firstFusion[key] = cloneFusion[key];
          }
        } else {
          firstFusion[key] = cloneFusion[key];
        }
      } else {
        firstFusion[key] = cloneFusion[key];
      }
    }
    return firstFusion;
  }

  /* 数据回填 -- 根据当前表单进行数据回填 */
  public resultFormInitel(validateForm: FormGroup|FormArray|FormControl|AbortController|any, renderInfo: any) {
    for (let key in validateForm.controls) {
      if (validateForm.controls[key] instanceof FormGroup) {
        this.resultFormInitel(validateForm.controls[key], renderInfo[key]);
      } else if ((validateForm.controls[key] instanceof FormArray) && renderInfo[key]) {
        for (let i = 0; i < validateForm.controls[key].length; i ++) {
          if (validateForm.controls[key].controls[i] instanceof FormGroup) {
            if (validateForm.controls[key].controls[i].value.ruleCode) {
              renderInfo[key].some((child: any) => {
                if (child.ruleCode === validateForm.controls[key].controls[i].value.ruleCode) {
                  this.resultFormInitel(validateForm.controls[key].controls[i], child);
                  return true
                }
                return false
              })
            } else {
              this.resultFormInitel(validateForm.controls[key].controls[i], renderInfo[key][i])
            }
          } else if (validateForm.controls[key].controls[i] instanceof FormArray) {
            this.resultFormInitel(validateForm.controls[key].controls[i], renderInfo[key][i]);
          } else if (validateForm.controls[key].controls[i] instanceof FormControl) {
            validateForm.controls[key].controls[i].controls.setValue(renderInfo[key][i]);
          }
        }
      } else {
        // console.log(key, renderInfo[key])
        if (renderInfo[key]) {
          validateForm.controls[key].setValue(renderInfo[key])
        }
      }
    }
  }
}
