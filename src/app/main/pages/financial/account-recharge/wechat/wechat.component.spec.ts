/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WechatComponent } from './wechat.component';

describe('WechatComponent', () => {
  let component: WechatComponent;
  let fixture: ComponentFixture<WechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
