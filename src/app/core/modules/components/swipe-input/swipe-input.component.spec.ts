/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeInputComponent } from './swipe-input.component';

describe('SwipeInputComponent', () => {
  let component: SwipeInputComponent;
  let fixture: ComponentFixture<SwipeInputComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
