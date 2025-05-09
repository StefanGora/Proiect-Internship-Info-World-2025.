import { useNavigate } from 'react-router-dom';
import TicketListComponent from '../components/TicketListComponent';

function AcceptedAppointmentsPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div>
      <h1>Accepted Appointments</h1>
      <button onClick={handleBack}>Dashboard</button>
      <TicketListComponent url="http://localhost:3000/api/get/appointments/accepted" 
      formType="accepted"
      /> 
    </div>
  );
}

export default AcceptedAppointmentsPage;
