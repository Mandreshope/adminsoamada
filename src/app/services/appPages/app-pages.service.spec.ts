import { TestBed } from '@angular/core/testing';

import { AppPagesService } from './app-pages.service';

describe('AppPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppPagesService = TestBed.get(AppPagesService);
    expect(service).toBeTruthy();
  });
});
