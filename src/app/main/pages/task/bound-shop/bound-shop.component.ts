import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiMerchantService } from 'src/app/core/modules/provider/api';
import { SystemService } from 'src/app/core/services/system/system.service';


@Component({
  selector: 'swipe-bound-shop',
  templateUrl: './bound-shop.component.html',
  styleUrls: ['./bound-shop.component.scss']
})
export class BoundShopComponent implements OnInit {

  public platformRenderArray: any[] = [];

  public selectedValue = null;

  public validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private apiMerchantService: ApiMerchantService
  ) {}

  ngOnInit(): void {
    this.initalOtherConfig();
    /* 注册表单控制器 */
    this.validateForm = this.fb.group({
      platformId: [null, [Validators.required]],
      account: [null, [Validators.required]],
      title: [null, [Validators.required]],
      website: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  private initalOtherConfig() {
    this.apiMerchantService.asyncFetchPlatformListInfo().subscribe(res => {
      // console.log(res);
      this.platformRenderArray = res.rel;
    })
  }

  /* 提交数据 */
  public submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.validateForm)
    if (this.validateForm.valid) {
      this.apiMerchantService.asyncFetchBindShopInfo(this.validateForm.value).subscribe(res => {
        // console.log(res);
        this.systemService.presentToast('添加商铺成功!', 'success');
        this.validateForm.reset();
      })
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

}
