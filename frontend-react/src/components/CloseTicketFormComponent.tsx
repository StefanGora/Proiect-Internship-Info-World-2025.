import React, { useState } from 'react';
import { useCloseTicket } from '../hooks/useCloseTicket';
import { useUpdateAppointment } from '../hooks/useUpdateAppointment';

interface CloseTicketFormProps {
  clientId: number;
  carId: number;
  appointmentId: number;
}

const CloseTicketForm: React.FC<CloseTicketFormProps> = ({ clientId, carId, appointmentId }) => {
  const [visualInspection, setVisualInspection] = useState('');
  const [workPerformed, setWorkPerformed] = useState('');
  const [repairDuration, setRepairDuration] = useState('');

  const { closeTicket, loading, error, success } = useCloseTicket();
  const { updateAppointment } = useUpdateAppointment();

  const handleSubmit = async () => {
    const duration = parseInt(repairDuration, 10);

    if (isNaN(duration) || duration % 10 !== 0 || duration < 0) {
      alert('Repair duration must be a positive integer and a multiple of 10.');
      return;
    }

    // Submit ticket close info
    await closeTicket({
      client_id: clientId,
      car_id: carId,
      appointment_id: appointmentId,
      visual_inspection: visualInspection,
      work_performed: workPerformed,
      repair_duration: duration,
    });

    // If successful, update appointment status
    if (!error) {
      await updateAppointment(appointmentId.toString(), {
        status: 'completed',
      });
    }
  };

  return (
    <div>
      <label>
        Visual Inspection:
        <input
          type="text"
          value={visualInspection}
          onChange={(e) => setVisualInspection(e.target.value)}
          placeholder="e.g., Checked engine, brakes, and alignment"
        />
      </label>

      <label>
        Work Performed:
        <input
          type="text"
          value={workPerformed}
          onChange={(e) => setWorkPerformed(e.target.value)}
          placeholder="Describe what was repaired or serviced"
        />
      </label>

      <label>
        Repair Duration (minutes):
        <input
          type="text"
          value={repairDuration}
          onChange={(e) => setRepairDuration(e.target.value)}
          placeholder="Enter time in multiples of 10"
        />
      </label>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Close Ticket'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>✅ Ticket closed and status updated!</p>}
    </div>
  );
};

export default CloseTicketForm;
