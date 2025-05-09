import React, { useState } from 'react';
import { useAvailability } from '../hooks/useGetAvailability';
import { useUpdateAppointment } from '../hooks/useUpdateAppointment';

interface AvailabilityFormComponentProps {
  appointmentId: string;
}

const AvailabilityFormComponent: React.FC<AvailabilityFormComponentProps> = ({ appointmentId }) => {
  const { availability, loading: availabilityLoading, error: availabilityError, refetch } = useAvailability();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { updateAppointment, loading: updateLoading, error: updateError, success } = useUpdateAppointment();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time.');
      return;
    }

    await updateAppointment(appointmentId, {
      appointment_day: selectedDate,
      appointment_time: selectedTime,
      action: '', // No visual inspection or custom action
      status: 'accepted',
    });

    // Refetch availability after updating the appointment
    refetch(); // Call the refetch function to reload the availability
  };

  if (availabilityLoading) return <p>Loading availability...</p>;
  if (availabilityError) return <p>Error: {availabilityError}</p>;
  if (!availability || Object.keys(availability).length === 0) return <p>No availability data found.</p>;

  return (
    <div>
      <h2>Select Availability</h2>

      {/* Date Dropdown */}
      <div>
        <label>
          Date:
          <select value={selectedDate} onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(''); // Reset time when date changes
          }}>
            <option value="">Select a date</option>
            {Object.keys(availability).map((date) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Time Dropdown */}
      {selectedDate && (
        <div>
          <label>
            Time:
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              <option value="">Select a time</option>
              {availability[selectedDate].map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Submit */}
      <div>
        <button onClick={handleSubmit} disabled={updateLoading}>
          {updateLoading ? 'Submitting...' : 'Start Ticket'}
        </button>
        {updateError && <p style={{ color: 'red' }}>Error: {updateError}</p>}
        {success && <p style={{ color: 'green' }}>✅ Appointment updated!</p>}
      </div>
    </div>
  );
};

export default AvailabilityFormComponent;
