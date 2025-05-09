import { useNavigate } from 'react-router-dom';


function AdminPage() { 
  const navigate = useNavigate();


  const handleGoPending = () => {
    navigate('/admin/pending');        // Navigate to login page
  };
  const handleGoAccepted = () => {
    navigate('/admin/accepted');        // Navigate to login page
  };
  
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage
    navigate('/');        // Navigate to login page
  };


  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGoPending}>Pending Appointments</button>
      <button onClick={handleGoAccepted}>Accepted Appointments</button>
      
    </div>
  );
}

export default AdminPage;
