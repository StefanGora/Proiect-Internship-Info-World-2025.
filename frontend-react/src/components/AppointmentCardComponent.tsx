import React from 'react';
import Appointment from '../models/appointment.model';
import useCancelAppointment from '../hooks/useCancelAppointment';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCardComponent: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const { cancelAppointment, loading, error, success } = useCancelAppointment();

  const handleCancel = () => {
    cancelAppointment(appointment.id);
  };

  return (
    <div>
      <h2>{appointment.brand} {appointment.model} ({appointment.appointment_day})</h2>
      <p><strong>Appointment Time:</strong> {appointment.appointment_time}</p>
      <p><strong>Action:</strong> {appointment.action}</p>

      <button onClick={handleCancel} disabled={loading}>
        {loading ? 'Cancelling...' : 'Cancel Appointment'}
      </button>

      {success && <p style={{ color: 'green' }}>✅ Canceled</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
};

export default AppointmentCardComponent;
