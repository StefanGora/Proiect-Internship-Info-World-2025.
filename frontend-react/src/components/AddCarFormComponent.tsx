import React, { useState } from 'react';
import { CarFormData } from '../types/carFormData.types';
import "../assets/css/CarForm.css";

interface AddCarFormProps {
  onSubmit: (formData: CarFormData) => void;
}

const defaultForm: Omit<CarFormData, 'client_id'> = {
  license_plate: '',
  chassis_number: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  engine_type: '',
  engine_capacity: 0,
  horsepower: 0,
  kw_power: 0,
};

const AddCarFormComponent: React.FC<AddCarFormProps> = ({ onSubmit }) => {
  const storedClientId = localStorage.getItem('clientId');
  const clientId = storedClientId ? parseInt(storedClientId, 10) : null;

  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: ['year', 'engine_capacity', 'horsepower', 'kw_power'].includes(name)
        ? Number(value) // Handle numeric fields as numbers
        : value, // Keep text fields as they are
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (clientId === null) {
      console.error('❌ No client_id found in localStorage.');
      return;
    }

    onSubmit({
      ...formData,
      client_id: clientId,
    });

    setFormData(defaultForm);
  };

  return (
    <div id="car-form-container">
      <form onSubmit={handleSubmit}>
        <input 
          name="license_plate" 
          type="text" 
          placeholder="License Plate" 
          value={formData.license_plate} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="chassis_number" 
          type="text" 
          placeholder="Chassis Number" 
          value={formData.chassis_number} 
          onChange={handleChange} 
        />
        
        <input 
          name="brand" 
          type="text" 
          placeholder="Brand" 
          value={formData.brand} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="model" 
          type="text" 
          placeholder="Model" 
          value={formData.model} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="year" 
          type="number" 
          placeholder="Year" 
          value={formData.year} 
          onChange={handleChange} 
          required 
        />
        
        <select name="engine_type" value={formData.engine_type} onChange={handleChange} required>
          <option value="">Select Engine Type</option>
          <option value="diesel">Diesel</option>
          <option value="benzina">Benzina</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <input 
          name="engine_capacity" 
          type="number" 
          placeholder="Engine Capacity (cc)" 
          value={formData.engine_capacity} 
          onChange={handleChange} 
        />
        
        <input 
          name="horsepower" 
          type="number" 
          placeholder="Horsepower" 
          value={formData.horsepower} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="kw_power" 
          type="number" 
          placeholder="KW Power" 
          value={formData.kw_power} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCarFormComponent;
