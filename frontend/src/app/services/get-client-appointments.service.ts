import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class GetClientAppointmentsService {
  constructor(private http: HttpClient) {}

  getClientAppointments(clientId: number, limit: number, offset: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `http://localhost:3000/api/get/clients/${clientId}/appointments?limit=${limit}&offset=${offset}`
    );
  }  

}
