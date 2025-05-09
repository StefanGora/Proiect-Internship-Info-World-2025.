interface Car {
    id: number;
    client_id: number;
    license_plate: string;
    chassis_number: string;
    brand: string;
    model: string;
    year: number;
    engine_type: 'diesel' | 'petrol' | 'electric' | 'hybrid' | string;
    engine_capacity: number; // in cc
    horsepower: number;
    kw_power: number; // in kilowatts
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
  export default Car;
  