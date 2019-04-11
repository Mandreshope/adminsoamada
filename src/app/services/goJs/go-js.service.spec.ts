import { TestBed } from '@angular/core/testing';

import { GoJsService } from './go-js.service';

describe('GoJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoJsService = TestBed.get(GoJsService);
    expect(service).toBeTruthy();
  });
});
