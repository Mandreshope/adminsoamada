import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskPage } from './my-task.page';

describe('MyTaskPage', () => {
  let component: MyTaskPage;
  let fixture: ComponentFixture<MyTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
