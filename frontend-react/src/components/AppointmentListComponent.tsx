import React, { useEffect, useState } from 'react';
import useGetClientAppointments from '../hooks/useGetClientAppointments';
import AppointmentCardComponent from './AppointmentCardComponent';

const AppointmentListComponent: React.FC = () => {
  const clientId = localStorage.getItem('clientId');
  const parsedClientId = clientId ? parseInt(clientId, 10) : null;

  const limit = 3;

  const [offset, setOffset] = useState(0);
  const [allAppointments, setAllAppointments] = useState(false);

  const { appointments, loading, error } = useGetClientAppointments(parsedClientId, limit, offset);

  const displayedAppointments = appointments ? appointments.slice(0, offset + limit) : [];

  useEffect(() => {
    if (appointments && appointments.length < offset + limit) {
      setAllAppointments(true);
    }
  }, [appointments, offset, limit]);

  const handleSeeMore = () => {
    if (allAppointments) {
      setOffset(0);
      setAllAppointments(false);
    } else {
      setOffset((prev) => prev + limit);
    }
  };

  if (loading && offset === 0) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!appointments || displayedAppointments.length === 0) return <p>No appointments found for this client.</p>;

  return (
    <div>
      <h1>Appointment List</h1>
      {displayedAppointments.map((appointment) => (
        <AppointmentCardComponent key={appointment.id} appointment={appointment} />
      ))}
      <button onClick={handleSeeMore}>
        {allAppointments ? 'See Less' : 'See More'}
      </button>
    </div>
  );
};


export default AppointmentListComponent;
