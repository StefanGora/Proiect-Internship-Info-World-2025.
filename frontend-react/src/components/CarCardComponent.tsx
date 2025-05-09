import React from 'react';
import Car from '../models/car.model';
import MakeAppointmentFormComponent from './MakeAppointmentFormComponent';
import useToggleHook from '../hooks/useToggleHook';

interface CarCardProps {
  car: Car;
}

const CarCardComponent: React.FC<CarCardProps> = ({ car }) => {

  const { isVisible: showAppointmentForm, toggle, currentLabel } = useToggleHook("Make Appointment", "Cancel");
  return (
    <div >
      <h2>{car.brand} {car.model} ({car.year})</h2>
      <p><strong>License Plate:</strong> {car.license_plate}</p>
      <p><strong>Engine:</strong> {car.engine_type}, {car.engine_capacity}cc, {car.horsepower} HP</p>
      <p><strong>Chassis Number:</strong> {car.chassis_number}</p>
      <button onClick={toggle}>{currentLabel}</button>
      {showAppointmentForm && <MakeAppointmentFormComponent carId={car.id} />}

    </div>
  );
};



export default CarCardComponent;
