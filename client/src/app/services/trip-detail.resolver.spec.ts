import { TestBed } from '@angular/core/testing';

import { TripDetailService } from './trip-detail.service';

describe('TripDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripDetailService = TestBed.get(TripDetailService);
    expect(service).toBeTruthy();
  });
});
