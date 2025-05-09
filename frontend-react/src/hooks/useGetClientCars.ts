import { useState, useEffect } from 'react';
import Car from '../models/car.model';

function useGetClientCars(clientId: number | null, limit = 3, offset = 0, pollInterval = 10000) {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = () => {
    if (clientId == null || isNaN(clientId)) {
      setError('Invalid clientId provided');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/get/clients/${clientId}/cars?limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch cars');
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCars(); // initial load
    const interval = setInterval(fetchCars, pollInterval); // re-fetch on interval

    return () => clearInterval(interval); // clean up
  }, [clientId, limit, offset]);

  return { cars, loading, error };
}

export default useGetClientCars;
