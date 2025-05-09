import useToggleHook from '../hooks/useToggleHook';
import { useEffect } from 'react';
import { useInsertCar } from '../hooks/useInsertCar';
import UserProfileComponent from '../components/UserProfileComponent';
import CarListComponent from '../components/CarListComponent';
import AppointmentListComponent from '../components/AppointmentListComponent';
import AddCarFormComponent from '../components/AddCarFormComponent';
import { CarFormData } from '../types/carFormData.types';
import "../assets/css/ClientPage.css";

function ClientPage() {
  const { isVisible: showCarForm, toggle, currentLabel } = useToggleHook("Add Car", "Cancel");
  const { insertCar, loading, error, result } = useInsertCar();

  const handleAddCar = async (formData: CarFormData) => {
    await insertCar(formData);
  };
  
  // Automatically close form when a car is successfully added
  useEffect(() => {
    if (result?.success) {
      toggle();
    }
  }, [result]);
  

  return (
    <div>
      <div id='client-profile-container'>
        <UserProfileComponent />
      </div>

      <div id='client-info-container'>
        <div id='cars-container'>
          <button onClick={toggle}>{currentLabel}</button>
          {showCarForm && <AddCarFormComponent onSubmit={handleAddCar} />}
          {loading && <p>Adding car...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <CarListComponent />
        </div>

        <AppointmentListComponent />
      </div>
    </div>
  );
}

export default ClientPage;
