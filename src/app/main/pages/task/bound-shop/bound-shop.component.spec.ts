/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoundShopComponent } from './bound-shop.component';

describe('BoundShopComponent', () => {
  let component: BoundShopComponent;
  let fixture: ComponentFixture<BoundShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
