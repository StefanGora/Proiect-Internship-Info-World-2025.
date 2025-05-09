import { insertClients } from './clientsSeed.js';  // Import client seeding logic
import { insertCars } from './carsSeed.js'; // Import car seeding logic
import { insertAppointments } from './appointmentsSeed.js';// Import appointments seeding logic
import { insertHistory } from './historySeed.js';//Import history seeding logic
import { initializeSchema } from '../schema.js';
import { insertAdmin } from './adminSeed.js';

export function seedDatabase(db, 
  { clientCount = 20, 
    carCount = 50,
    appointmentCount = 100, 
    clearExisting = false } = {}) {
  console.log("🌱 Initializing database schema and seeding data...");

  if (clearExisting) {
    console.log("🗑️  Clearing existing data...");
    db.exec(`
      DROP TABLE IF EXISTS clients;
      DROP TABLE IF EXISTS cars;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS appointments;
      DROP TABLE IF EXISTS history;
      -- Add more drop commands for future tables (cars, appointments, etc.)
    `);
  }

  // Initialize schema (create tables)
  initializeSchema(db);

  // Insert data into the clients table
  insertAdmin(db);
  insertClients(db, clientCount);
  insertCars(db, carCount);
  insertAppointments(db, appointmentCount);
  insertHistory(db)

  const admin = db.prepare('SELECT * FROM admins');
  const clients = db.prepare('SELECT * FROM clients').all();
  const cars = db.prepare('SELECT * FROM cars').all();
  const appointments = db.prepare('SELECT * FROM appointments').all();
  const history = db.prepare('SELECT * FROM history').all();

  //console.log(clinets);
  //console.log(cars);
  //console.log(appointments);
  //console.log(history);
  console.log(`📊 Generated ${clients.length} clients, ${cars.length} cars, ${appointments.length} appointsments, ${history.length} histtory entryes.`);
  console.log("✅ Database seeding complete!");
}
