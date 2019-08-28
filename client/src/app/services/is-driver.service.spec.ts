import { TestBed } from '@angular/core/testing';

import { IsDriverService } from './is-driver.service';

describe('IsDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsDriverService = TestBed.get(IsDriverService);
    expect(service).toBeTruthy();
  });
});
