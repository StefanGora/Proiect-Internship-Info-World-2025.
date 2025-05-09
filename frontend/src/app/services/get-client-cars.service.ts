import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class GetClientCarsService {
  constructor(private http: HttpClient) {}

  getClientCars(clientId: number, limit: number = 5, offset: number = 0): Observable<Car[]> {
    return this.http.get<Car[]>(
      `http://localhost:3000/api/get/clients/${clientId}/cars?limit=${limit}&offset=${offset}`
    );
  }
  
}
