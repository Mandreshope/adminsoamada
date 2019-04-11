import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEditPage } from './contract-edit.page';

describe('ContractEditPage', () => {
  let component: ContractEditPage;
  let fixture: ComponentFixture<ContractEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
