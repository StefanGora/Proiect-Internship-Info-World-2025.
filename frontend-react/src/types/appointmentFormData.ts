import Appointment from "../models/appointment.model";

export type AppointmentFormData = Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'status'> & {
  status: 'pending';
};
