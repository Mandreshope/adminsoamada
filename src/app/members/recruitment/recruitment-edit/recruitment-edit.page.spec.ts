import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentEditPage } from './recruitment-edit.page';

describe('RecruitmentEditPage', () => {
  let component: RecruitmentEditPage;
  let fixture: ComponentFixture<RecruitmentEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
