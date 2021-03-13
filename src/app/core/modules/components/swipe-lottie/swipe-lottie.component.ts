import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import lottie from 'lottie-web';
import { LottieConfig } from './swipe-lottie';

@Component({
  selector: 'swipe-lottie',
  templateUrl: './swipe-lottie.component.html',
  styleUrls: ['./swipe-lottie.component.scss']
})

export class SwipeLottieComponent implements OnInit {

  @ViewChild('lottie', {static: true}) public lottieDom: any;

  public lottieWeb!: object;

  @Input()
  private lottieWebConfig!: LottieConfig;

  constructor() { }

  ngOnInit() {
    console.log(this.lottieDom.nativeElement);
    this.lottieWeb = lottie.loadAnimation(Object.assign({
      container: this.lottieDom.nativeElement,
      ...this.lottieWebConfig
    }));
  }

}
