import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { Car } from '../../models/car.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { GetClientService } from '../../services/get-client.service';
import { GetClientCarsService } from '../../services/get-client-cars.service';
import { GetClientAppointmentsService } from '../../services/get-client-appointments.service';
import { CarComponent } from '../car/car.component';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, CarComponent, AppointmentComponent, RouterModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientData!: Client;
  cars: Car[] = [];
  carsLimit = 5;
  carsOffset = 0;
  allCarsLoaded = false;
  appointments: Appointment[] = [];
  appointmentsLimit = 5;
  appointmentsOffset = 0;
  allAppointmentsLoaded = false;


  constructor(
    private getClientService: GetClientService,
    private getClientCarsService: GetClientCarsService,
    private getClientAppointmentsService: GetClientAppointmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedClientData = localStorage.getItem('clientData');
  
    if (storedClientData) {
      this.clientData = JSON.parse(storedClientData);
      this.loadClientCars(this.clientData.id);
      this.loadClientAppointments(this.clientData.id);
    } else {
      this.getClientService.getApiResponse().subscribe({
        next: (response) => {
          this.clientData = response;
          localStorage.setItem('clientData', JSON.stringify(response));
          this.loadClientCars(response.id);
          this.loadClientAppointments(response.id);
        },
        error: (err) => console.error('Error fetching client data:', err),
      });
    }
  }
  

  logout(): void {
    localStorage.removeItem('clientData');
    this.router.navigate(['/']);
  }
  

  loadClientCars(clientId: number): void {
    this.getClientCarsService.getClientCars(clientId, this.carsLimit, this.carsOffset).subscribe({
      next: (newCars) => {
        if (newCars.length < this.carsLimit) this.allCarsLoaded = true;
        this.cars = [...this.cars, ...newCars];
        this.carsOffset += this.carsLimit;
      },
      error: (err) => console.error('Error fetching cars:', err),
    });
  }

  loadClientAppointments(clientId: number): void {
    this.getClientAppointmentsService.getClientAppointments(clientId, this.appointmentsLimit, this.appointmentsOffset)
      .subscribe({
        next: (newAppointments) => {
          if (newAppointments.length < this.appointmentsLimit) this.allAppointmentsLoaded = true;
          this.appointments = [...this.appointments, ...newAppointments];
          this.appointmentsOffset += this.appointmentsLimit;
        },
        error: (err) => console.error('Error fetching appointments:', err),
      });
  }
  
}
