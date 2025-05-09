import { useEffect } from 'react';
import useGetClientById from '../hooks/useGetClientById';
import { useNavigate } from 'react-router-dom';

function UserProfileComponent() {
  const clientId = localStorage.getItem('clientId');
  const parsedClientId = clientId ? parseInt(clientId, 10) : null;
  const { client, loading, error } = useGetClientById(parsedClientId); // Destructure from the custom hook
  const navigate = useNavigate();

  useEffect(() => {
    if (client) {
      console.log('Fetched client:', client);
    }
  }, [client]); // Run when client data is fetched

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage
    navigate('/');        // Navigate to login page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Client Page</h1>
      {client && (
        <div>
          <h2>{client.name}</h2>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phonenumber}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserProfileComponent;
