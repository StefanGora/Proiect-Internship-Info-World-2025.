import { faker } from '@faker-js/faker';

/**
 * Insert one history record for each appointment into the database.
 * @param {object} db - The SQLite database instance
 */
export function insertHistory(db) {
  console.log(`📚 Inserting history records for each appointment...`);

  const insert = db.prepare(`
    INSERT INTO history (
      client_id, car_id, appointment_id, visual_inspection, work_performed, repair_duration, created_at, updated_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  // Fetch all existing appointments
  const appointments = db.prepare(`
    SELECT id, client_id, car_id FROM appointments
  `).all();

  if (appointments.length === 0) {
    console.log("No appointments found. Cannot create history entries.");
    return;
  }

  appointments.forEach(appointment => {
    const visualInspection = faker.helpers.arrayElement([
      "Minor scratches on rear bumper.",
      "Front left door dented.",
      "Brought in for regular service.",
      "No visible damages reported.",
      "Oil leak detected under engine.",
      "Requested tire replacement and alignment check."
    ]);

    const workPerformed = faker.helpers.arrayElement([
      "Changed engine oil and oil filter.",
      "Repaired front left door dent and repainted.",
      "Replaced brake pads and rotors.",
      "Performed full diagnostic and updated ECU software.",
      "Replaced timing belt and water pump.",
      "Tire replacement and realignment completed."
    ]);

    const repairDuration = faker.number.int({ min: 1, max: 30 }) * 10;

    insert.run(
      appointment.client_id,
      appointment.car_id,
      appointment.id,
      visualInspection,
      workPerformed,
      repairDuration
    );
  });

}
