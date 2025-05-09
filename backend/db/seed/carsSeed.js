import { faker } from '@faker-js/faker';

/**
 * Insert a specified number of cars into the database.
 * Each car is associated with a client, and each client can have multiple cars.
 * @param {object} db - The SQLite database instance
 * @param {number} carCount - The number of cars to insert
 */
export function insertCars(db, carCount) {
  console.log(`🚗 Inserting ${carCount} cars into the database...`);

  const insert = db.prepare(`
    INSERT INTO cars (
      client_id, license_plate, chassis_number, brand, model, 
      year, engine_type, engine_capacity, horsepower, kw_power, 
      created_at, updated_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  // Get the IDs of the clients
  const clientIds = db.prepare('SELECT id FROM clients').all().map(row => row.id);

  // Ensure that every client has at least one car
  const clientCarCount = Math.min(carCount, clientIds.length);

  // First insert one car per client
  for (let i = 0; i < clientCarCount; i++) {
    const clientId = clientIds[i];  // Assign one car to each client

    const licensePlate = faker.vehicle.vrm();  // Random vehicle registration number
    const chassisNumber = faker.vehicle.vin(); // Random chassis number (Vehicle Identification Number)
    const brand = faker.vehicle.manufacturer(); // Random car brand
    const model = faker.vehicle.model(); // Random car model
    const year = faker.date.past(20).getFullYear(); // Random year (within the past 20 years)
    const engineType = faker.helpers.arrayElement(['diesel', 'benzina', 'hybrid', 'electric']); // Random engine type
    const engineCapacity = faker.number.int({ min: 1000, max: 5000 }); // Random engine capacity (1L to 5L)
    const horsepower = faker.number.int({ min: 60, max: 600 }); // Random horsepower
    const kwPower = (horsepower * 0.7457).toFixed(2); // Convert horsepower to kW (1 HP = 0.7457 kW)

    insert.run(
      clientId, licensePlate, chassisNumber, brand, model, 
      year, engineType, engineCapacity, horsepower, kwPower
    );
  }

  // If there are more cars to insert, randomly assign them to any client
  for (let i = clientCarCount; i < carCount; i++) {
    const clientId = faker.helpers.arrayElement(clientIds);  // Assign the remaining cars randomly

    const licensePlate = faker.vehicle.vrm();  // Random vehicle registration number
    const chassisNumber = faker.vehicle.vin(); // Random chassis number (Vehicle Identification Number)
    const brand = faker.vehicle.manufacturer(); // Random car brand
    const model = faker.vehicle.model(); // Random car model
    const year = faker.date.past(20).getFullYear(); // Random year (within the past 20 years)
    const engineType = faker.helpers.arrayElement(['diesel', 'benzina', 'hybrid', 'electric']); // Random engine type
    const engineCapacity = faker.number.int({ min: 1000, max: 5000 }); // Random engine capacity (1L to 5L)
    const horsepower = faker.number.int({ min: 60, max: 600 }); // Random horsepower
    const kwPower = (horsepower * 0.7457).toFixed(2); // Convert horsepower to kW (1 HP = 0.7457 kW)

    insert.run(
      clientId, licensePlate, chassisNumber, brand, model, 
      year, engineType, engineCapacity, horsepower, kwPower
    );
  }

}
