import React from 'react';
import AdminAppointment from '../models/admin-appointment.model';
import AdminAppointmentCardComponent from './AdminAppointmentCardComponent';
import AvailabilityFormComponent from './AvailabilityFormComponent';
import CloseTicketForm from './CloseTicketFormComponent';

interface TicketProps {
  appointment: AdminAppointment;
  formType: 'pending' | 'accepted';
}

const Ticket: React.FC<TicketProps> = ({ appointment, formType }) => {
  
  return (
    <div>
      {/* Section 1: Appointment Card */}
      <section>
        <AdminAppointmentCardComponent appointment={appointment} />
      </section>

      {/* Section 2: Conditional Form Placeholder */}
      <section>
        {formType === 'pending' ? (
          <AvailabilityFormComponent appointmentId={appointment.id.toString()} />
        ) : (
          <CloseTicketForm
          clientId={appointment.client_id}
          carId={appointment.car_id}
          appointmentId={appointment.id}
          />
        )}
      </section>
    </div>
  );
};

export default Ticket;
