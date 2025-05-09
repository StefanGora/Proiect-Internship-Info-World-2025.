import React, { useEffect, useState } from 'react';
import useGetClientCars from '../hooks/useGetClientCars';
import CarCardComponent from './CarCardComponent';

const CarListComponent: React.FC = () => {
  const clientId = localStorage.getItem('clientId');
  const parsedClientId = clientId ? parseInt(clientId, 10) : null;

  const limit = 3;

  const [carsList, setCarsList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [allCars, setAllCars] = useState(false);

  const { cars, loading, error } = useGetClientCars(parsedClientId, limit, offset);

  useEffect(() => {
    if (cars) {
      if (cars.length < limit) {
        setAllCars(true);
      }
  
      if (cars.length > 0) {
        setCarsList((prevCars) => {
          const existingIds = new Set(prevCars.map((c) => c.id));
          const newCars = cars.filter((c) => !existingIds.has(c.id));
          return [...prevCars, ...newCars];
        });
      }
    }
  }, [cars]);
  

  const handleSeeMore = () => {
    if (allCars) {
      // Reset state first
      setAllCars(false);
      setCarsList([]);
      setOffset(0); // ⚠️ setting offset last triggers hook re-fetch cleanly
    } else {
      setOffset((prev) => prev + limit);
    }
  };
  
  

  if (loading && offset === 0) return <p>Loading cars...</p>;
  if (error) return <p>Error: {error}</p>;
  if (carsList.length === 0) return <p>No cars found for this client.</p>;

  return (
    <div>
      <h1>Car List</h1>
      {carsList.map((car) => (
        <CarCardComponent key={car.id} car={car} />
      ))}
       <button onClick={handleSeeMore}>
        {allCars ? 'See Less' : 'See More'}
      </button>
    </div>
  );
};

export default CarListComponent;
