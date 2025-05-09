import { useState, useEffect } from 'react';

function useAdminLogin (){
    const [adminId, setAdmin] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:3000/api/login/admins')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch client');
            }
            return response.json();
          })
          .then((data) => {
            setAdmin(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
    
      return { adminId, loading, error };
}

export default useAdminLogin