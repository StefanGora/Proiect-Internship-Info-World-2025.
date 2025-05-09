import React, { useState } from 'react';
import useAdminAppointments from '../hooks/useAdminAppointments';
import Ticket from './TicketComponent';

interface TicketListComponentProps {
  url: string;
  formType: 'pending' | 'accepted';
}

const limit = 10;

const TicketListComponent: React.FC<TicketListComponentProps> = ({ url, formType }) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { appointments, loading, error } = useAdminAppointments(url, limit, offset, 10000);

  const filteredAppointments = (appointments || []).filter(
    (a) => a.status === formType
  );

  // Optional: Estimate total pages from appointments.length
  const estimatedTotalPages = appointments && appointments.length === limit ? page + 1 : page;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading && page === 1) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredAppointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div>
      {filteredAppointments.map((appointment) => (
        <Ticket key={appointment.id} appointment={appointment} formType={formType} />
      ))}

      {/* Pagination Controls */}
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: estimatedTotalPages }, (_, idx) => idx + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              fontWeight: p === page ? 'bold' : 'normal',
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketListComponent;
