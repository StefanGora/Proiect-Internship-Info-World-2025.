import { useEffect, useState, useCallback } from 'react';

interface AvailabilityData {
  [date: string]: string[]; // e.g., { '2025-05-04': ['08:00', '08:30'] }
}

export function useAvailability() {
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/get/availability');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('✅ Availability:', data.availability);
      setAvailability(data.availability);
    } catch (err) {
      console.error('❌ Failed to fetch availability:', err);
      setError('Could not fetch availability');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return { availability, loading, error, refetch: fetchAvailability };
}
