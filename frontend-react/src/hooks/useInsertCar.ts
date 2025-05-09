// src/hooks/useInsertCar.ts
import { useState } from 'react';
import { CarFormData } from '../types/carFormData.types';

interface InsertCarResult {
  success: boolean;
  message: string;
}

export function useInsertCar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<InsertCarResult | null>(null);
  
    const insertCar = async (formData: CarFormData) => {
      setLoading(true);
      setError(null);
  
      try {
        console.log('🚀 Sending formData:', formData); // 🔍 Debug log
  
        const response = await fetch('http://localhost:3000/api/create/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        console.log('📥 Backend response:', data); // 🔍 Debug log
  
        if (!response.ok) {
          throw new Error(data.error || 'Failed to add car');
        }
  
        setResult({ success: true, message: data.message });
      } catch (err: any) {
        console.error('❌ Error submitting car:', err); // 🔍 Debug log
        setError(err.message);
        setResult({ success: false, message: err.message });
      } finally {
        setLoading(false);
      }
    };
  
    return { insertCar, loading, error, result };
  }
  