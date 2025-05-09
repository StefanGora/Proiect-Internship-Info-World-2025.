// models/admin-appointment.model.ts

export default interface AdminAppointment {
    id: number;
    client_id: number;
    car_id: number;
    appointment_day: string;
    appointment_time: string;
    action: string;
    contact_method: 'in_person' | 'phone' | 'email' | string;
    status: 'accepted' | 'pending'| string;
    created_at: string;
    updated_at: string;
    client_name: string;
    car_name: string;
  }
  