/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyAppealComponent } from './my-appeal.component';

describe('MyAppealComponent', () => {
  let component: MyAppealComponent;
  let fixture: ComponentFixture<MyAppealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
