import { useState, useEffect } from 'react';
import Appointment from '../models/appointment.model';

// hooks/useGetClientAppointments.ts
function useGetClientAppointments(clientId: number | null, limit = 3, offset = 0, pollInterval = 10) {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = () => {
    if (clientId == null || isNaN(clientId)) {
      setError('Invalid clientId provided');
      setLoading(false);
      return;
    }

    const effectiveLimit = offset + limit;

    fetch(`http://localhost:3000/api/get/clients/${clientId}/appointments?limit=${effectiveLimit}&offset=0`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return res.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments(); // initial load
    const interval = setInterval(fetchAppointments, pollInterval); // polling

    return () => clearInterval(interval);
  }, [clientId, offset]); // 🧠 Not watching limit anymore, just offset

  return { appointments, loading, error };
}


export default useGetClientAppointments;
