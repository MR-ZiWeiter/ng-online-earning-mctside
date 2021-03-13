/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeLottieComponent } from './swipe-lottie.component';

describe('SwipeLottieComponent', () => {
  let component: SwipeLottieComponent;
  let fixture: ComponentFixture<SwipeLottieComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeLottieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
