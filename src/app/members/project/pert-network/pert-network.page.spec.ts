import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PertNetworkPage } from './pert-network.page';

describe('PertNetworkPage', () => {
  let component: PertNetworkPage;
  let fixture: ComponentFixture<PertNetworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertNetworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PertNetworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
