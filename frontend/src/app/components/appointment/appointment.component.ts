import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']  // <-- fix this line
})

export class AppointmentComponent {
  @Input() appointment!: Appointment;
}
