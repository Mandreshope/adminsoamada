import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentPage } from './recruitment.page';

describe('RecruitmentPage', () => {
  let component: RecruitmentPage;
  let fixture: ComponentFixture<RecruitmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
