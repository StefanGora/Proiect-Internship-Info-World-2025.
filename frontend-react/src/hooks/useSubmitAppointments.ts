import { useState } from "react";

const useSubmitAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitAppointment = async (
    clientId: string,
    carId: string,
    action: string,
    contactMethod: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:3000/api/create/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          car_id: carId,
          action,
          contact_method: contactMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (err: any) {
      setError(err.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { submitAppointment, loading, error, successMessage };
};

export default useSubmitAppointment;
