import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModalPageComponent } from './customer-modal-page.component';

describe('CustomerModalPageComponent', () => {
  let component: CustomerModalPageComponent;
  let fixture: ComponentFixture<CustomerModalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
