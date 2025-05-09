import { useNavigate } from 'react-router-dom';
import TicketListComponent from '../components/TicketListComponent';

function PendingAppointmentsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div>
      <h1>Pending Appointments</h1>
      <button onClick={handleBack}>Dashboard</button>
      <TicketListComponent url="http://localhost:3000/api/get/appointments/pending" 
      formType="pending"
      /> 
    </div>
  );
}

export default PendingAppointmentsPage;
