import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ClientPage from './pages/ClientPage';
import AdmimPage from './pages/AdminPage';
import PendingAppointmentsPage from './pages/PendingAppointmentsPage';
import AcceptedAppointmentsPage from './pages/AcceptedAppointmentsPage';
import "./assets/css/App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/client" element={<ClientPage />} />
      <Route path="/admin" element={<AdmimPage />} />
      <Route path="/admin/pending" element={<PendingAppointmentsPage />} />
      <Route path="/admin/accepted" element={<AcceptedAppointmentsPage />} />
    </Routes>
  );
}

export default App;
