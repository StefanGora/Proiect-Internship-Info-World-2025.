import React from 'react';
import AdminAppointment from '../models/admin-appointment.model';
import "../assets/css/AdminAppointment.css"

interface Props {
  appointment: AdminAppointment;
}

const AdminAppointmentCardComponent: React.FC<Props> = ({ appointment }) => {
  return (
    <div id='admin-appt-client-info'>
      <h2>Client: {appointment.client_name}</h2>
        <p>Car: {appointment.car_name}</p>
        <p>Action: {appointment.action}</p>
        <p>Date: {appointment.appointment_day}</p>
        <p>Time: {appointment.appointment_time}</p>
        <p>Contact Method: {appointment.contact_method}</p>
        <p>Status: {appointment.status === 'pending' ? 'Pending' : 'Accepted'}</p>
    </div>
  );
};

export default AdminAppointmentCardComponent;
