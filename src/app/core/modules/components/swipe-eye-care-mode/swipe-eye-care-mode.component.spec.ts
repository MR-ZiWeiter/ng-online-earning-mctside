/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeEyeCareModeComponent } from './swipe-eye-care-mode.component';

describe('SwipeEyeCareModeComponent', () => {
  let component: SwipeEyeCareModeComponent;
  let fixture: ComponentFixture<SwipeEyeCareModeComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeEyeCareModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeEyeCareModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
