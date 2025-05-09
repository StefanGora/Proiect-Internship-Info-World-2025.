import React, { useState } from "react";
import useSubmitAppointment from "../hooks/useSubmitAppointments";
import "../assets/css/MakeAppointment.css";

interface MakeAppointmentFormProps {
  carId: string | number; // Adjust type based on your model
}

const MakeAppointmentFormComponent: React.FC<MakeAppointmentFormProps> = ({ carId }) => {
  const { submitAppointment, loading, error, successMessage } = useSubmitAppointment();
  const [action, setAction] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const validContactMethods = ["email", "phone", "in_person"];

  const clientId = localStorage.getItem("clientId") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!action || !contactMethod) {
      alert("Please fill in all fields.");
      return;
    }

    submitAppointment(clientId, String(carId), action, contactMethod);
  };

  return (
    <div id="appointment-form-container">
      <h3>Make an Appointment</h3>

      {loading && <p>Loading availability...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="action"></label>
          <input
            id="action"
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Describe the issue or service"
          />
        </div>

        <div>
          <label htmlFor="contactMethod">Preferred Contact Method:</label>
          <select
            id="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="">-- Choose a Contact Method --</option>
            {validContactMethods.map((method) => (
              <option key={method} value={method}>
                {method.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          Submit
        </button>

        {action && contactMethod && (
          <p>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          </p>
        )}
      </form>
    </div>
  );
};

export default MakeAppointmentFormComponent;
