import { TestBed } from '@angular/core/testing';

import { IsRiderService } from './is-rider.service';

describe('IsRiderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsRiderService = TestBed.get(IsRiderService);
    expect(service).toBeTruthy();
  });
});
