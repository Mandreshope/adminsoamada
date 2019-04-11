import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectPage } from './my-project.page';

describe('MyProjectPage', () => {
  let component: MyProjectPage;
  let fixture: ComponentFixture<MyProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
