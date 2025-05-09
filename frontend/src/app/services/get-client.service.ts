import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class GetClientService {

  constructor(private http: HttpClient) { }
  
  getApiResponse(): Observable<Client> {
    return this.http.get<Client>('http://localhost:3000/api/get/random-client');
  }
  
}
