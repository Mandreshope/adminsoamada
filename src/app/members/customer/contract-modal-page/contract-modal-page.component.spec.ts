import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractModalPageComponent } from './contract-modal-page.component';

describe('ContractModalPageComponent', () => {
  let component: ContractModalPageComponent;
  let fixture: ComponentFixture<ContractModalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractModalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractModalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
