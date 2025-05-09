import { useState } from 'react';

interface CloseTicketData {
  client_id: number;
  car_id: number;
  appointment_id: number;
  visual_inspection?: string;
  work_performed?: string;
  repair_duration?: number;
}

export function useCloseTicket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const closeTicket = async (data: CloseTicketData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/api/patch/history', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to close ticket');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { closeTicket, loading, error, success };
}
