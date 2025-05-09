import { useState } from 'react';

interface UpdateAppointmentPayload {
  appointment_day?: string;
  appointment_time?: string;
  action?: string; // Optional
  status: string;
}

export const useUpdateAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateAppointment = async (appointmentId: string, payload: UpdateAppointmentPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:3000/api/patch/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    updateAppointment,
    loading,
    error,
    success,
  };
};
