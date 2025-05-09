import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {
  @Input() car!: Car;
}
