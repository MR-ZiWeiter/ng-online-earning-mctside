/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BankAhtionComponent } from './bank-ahtion.component';

describe('BankAhtionComponent', () => {
  let component: BankAhtionComponent;
  let fixture: ComponentFixture<BankAhtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAhtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAhtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
