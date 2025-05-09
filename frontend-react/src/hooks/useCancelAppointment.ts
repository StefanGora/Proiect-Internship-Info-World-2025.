// src/hooks/useCancelAppointment.ts
import { useState } from 'react';

function useCancelAppointment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const cancelAppointment = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`http://localhost:3000/api/patch/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'canceled',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to cancel appointment');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { cancelAppointment, loading, error, success };
}

export default useCancelAppointment;
