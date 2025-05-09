import { faker } from '@faker-js/faker';

export function insertAppointments(db, appointmentCount) {
  console.log(`📅 Inserting ${appointmentCount} appointments into the database...`);

  const insert = db.prepare(`
    INSERT INTO appointments (
      client_id, car_id, appointment_day, appointment_time, action, contact_method, status
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Fetch all clients and their corresponding cars
  const clients = db.prepare('SELECT id FROM clients').all();

  // Define the valid 30-minute appointment times
  const validTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  for (let i = 0; i < appointmentCount; i++) {
    // Pick a random client
    const client = faker.helpers.arrayElement(clients);

    // Fetch cars for this client
    const cars = db.prepare('SELECT id FROM cars WHERE client_id = ?').all(client.id);

    // Pick a random car owned by the client
    const carId = faker.helpers.arrayElement(cars).id;

    // Pick a random status
    const status = faker.helpers.arrayElement(['pending', 'accepted','completed', 'canceled']);

    // If status is 'pending', leave appointment_day and appointment_time undefined
    let appointmentDay = null;
    let appointmentTime = null;

    if (status !== 'pending') {
      // Pick a random valid time from the array
      appointmentTime = faker.helpers.arrayElement(validTimes);

      // Generate a random appointment day within 2025
      appointmentDay = faker.date.between({
        from: new Date('2025-01-01'),
        to: new Date('2025-12-31')
      }).toISOString().split('T')[0];
    }

    // Pick a random action and contact method
    const action = faker.helpers.arrayElement(['maintenance', 'repair', 'inspection', 'service', 'oil change']);
    const contactMethod = faker.helpers.arrayElement(['email', 'phone', 'in_person']);

    // Insert the appointment with the correct car for the client, and possibly null day/time if status is 'pending'
    insert.run(client.id, carId, appointmentDay, appointmentTime, action, contactMethod, status);
  }
}
