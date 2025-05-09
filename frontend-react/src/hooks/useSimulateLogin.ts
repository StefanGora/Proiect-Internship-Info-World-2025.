import { useState, useEffect } from 'react';

function useSimulateLogin (){
    const [clientId, setClient] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:3000/api/login/clients')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch client');
            }
            return response.json();
          })
          .then((data) => {
            setClient(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
    
      return { clientId, loading, error };
}

export default useSimulateLogin