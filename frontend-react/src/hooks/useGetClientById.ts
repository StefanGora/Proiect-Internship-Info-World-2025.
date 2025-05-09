import { useState, useEffect } from 'react';
import Client from '../models/client.model';

function useGetClientById(clientId: number | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (clientId == null || isNaN(clientId)) {
      setError('Invalid clientId provided');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/get/client-by-id?id=${clientId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch client');
        return res.json();
      })
      .then((data) => {
        setClient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [clientId]);

  return { client, loading, error };
}

export default useGetClientById;
