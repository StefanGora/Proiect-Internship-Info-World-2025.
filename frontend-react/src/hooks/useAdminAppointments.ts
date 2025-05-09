import { useState, useEffect } from 'react';
import AdminAppointment from '../models/admin-appointment.model';

function useAdminAppointments(
  url: string,
  limit = 10,
  offset = 0,
  pollInterval = 10000
) {
  const [appointments, setAppointments] = useState<AdminAppointment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = () => {
    fetch(`${url}?limit=${limit}&offset=${offset}`)
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
    fetchAppointments();
    const interval = setInterval(fetchAppointments, pollInterval);
    return () => clearInterval(interval);
  }, [url, limit, offset]);

  return { appointments, loading, error };
}

export default useAdminAppointments;
