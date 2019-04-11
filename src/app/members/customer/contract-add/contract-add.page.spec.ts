import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddPage } from './contract-add.page';

describe('ContractAddPage', () => {
  let component: ContractAddPage;
  let fixture: ComponentFixture<ContractAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
