import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from '@app/env';

@Injectable({
  providedIn: 'root'
})

export class WebviewService {
  constructor(
    private router: Router
  ) {}
  /**
   * 打开六一协议
   * @param type 协议类型
   */
  public openServiceRuleEvent(type: number): void {
    this.router.navigate(['/pages/preview', {outlets: {'webview-popup': ['webview', type]}}], {
      queryParams: {
        redirectUrl: environment.BASIC_URL + `/assets/html/rule-service.html?type=${type}&time=${new Date().getTime()}`
      }
    });
  }
  public openWebviewByUrl(url: string): void {
    const timer = new Date().getTime();
    const redirectUrl = (url.includes('http://') || url.includes('https://')) ? url : environment.BASIC_URL + url;
    this.router.navigate(['/pages/preview', {outlets: {'webview-popup': ['webview', timer]}}], {
      queryParams: {
        redirectUrl
      }
    });
  }
  public openWebviewTargetByUrl(url: string): void {
    const timer = new Date().getTime();
    const redirectUrl = (url.includes('http://') || url.includes('https://')) ? url : environment.BASIC_URL + url;
    window.open(redirectUrl, '_blank');
  }
}
