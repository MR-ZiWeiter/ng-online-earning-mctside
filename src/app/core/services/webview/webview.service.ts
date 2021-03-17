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
