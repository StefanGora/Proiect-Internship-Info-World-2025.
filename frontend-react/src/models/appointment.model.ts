interface Appointment {
    id: number;
    client_id: number;
    car_id: number;
    brand: string;
    model: string;
    appointment_day: string; // ISO date string
    appointment_time: string; // HH:mm format
    action: string; 
    contact_method: 'in_person' | 'phone' | 'email' | string; 
    status: 'accepted' | 'pending' | 'completed' | 'canceled' | string; 
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
  export default Appointment;
  