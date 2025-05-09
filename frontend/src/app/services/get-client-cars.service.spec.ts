import { TestBed } from '@angular/core/testing';

import { GetClientCarsService } from './get-client-cars.service';

describe('GetClientCarsService', () => {
  let service: GetClientCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
