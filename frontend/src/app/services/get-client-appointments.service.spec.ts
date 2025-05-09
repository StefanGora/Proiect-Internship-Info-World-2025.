import { TestBed } from '@angular/core/testing';

import { GetClientAppointmentsService } from './get-client-appointments.service';

describe('GetClientAppointmentsService', () => {
  let service: GetClientAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
