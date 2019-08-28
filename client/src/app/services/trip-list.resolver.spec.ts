import { TestBed } from '@angular/core/testing';

import { TripListService } from './trip-list.service';

describe('TripListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripListService = TestBed.get(TripListService);
    expect(service).toBeTruthy();
  });
});
