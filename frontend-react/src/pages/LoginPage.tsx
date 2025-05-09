import { useNavigate } from "react-router-dom";
import useSimulateLogin from "../hooks/useSimulateLogin";
import useAdminLogin from "../hooks/useAdminLogin";


function LoginPage() {
  const { clientId, loading, error } = useSimulateLogin();
  const { adminId, load, err } = useAdminLogin();
  const navigate = useNavigate();

  const handleClientLogin = () => {
    if (clientId) {
      localStorage.setItem('clientId', String(clientId.clientId)); 
      console.log('Client ID stored in localStorage:', clientId.clientId);
      navigate('/client');
    } else {
      console.error('Client not available yet.');
    }
  };

  const handleAdminLogin = () => {
    if(adminId){
      localStorage.setItem('clientId', String(adminId.adminId)); 
      console.log('Admin ID stored in localStorage:', adminId.adminId);
      navigate('/admin');
    } else {
      console.error('Admin not available yet.');
    }

  };

  return (
    <div>
      <h1>Login Page</h1>
      {loading && <p>Loading client...</p>}
      {error && <p>Error loading client: {error}</p>}
      {load && <p>Loading admin...</p>}
      {err && <p>Error loading admin: {error}</p>}
      <button onClick={handleClientLogin}>Login Client</button>
      <button onClick={handleAdminLogin}>Login Admin</button>
    </div>
  );
}

export default LoginPage;
