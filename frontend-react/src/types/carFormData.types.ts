import Car from "../models/car.model";

export type CarFormData = Omit<Car, 'id' | 'created_at' | 'updated_at'>;
