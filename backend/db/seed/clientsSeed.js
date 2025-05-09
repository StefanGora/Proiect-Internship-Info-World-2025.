import { faker } from '@faker-js/faker';

/**
 * Insert a specified number of clients into the database
 * @param {object} db - The SQLite database instance
 * @param {number} clientCount - The number of clients to insert
 */
export function insertClients(db, clientCount) {
  console.log(`👤 Inserting ${clientCount} clients into the database...`);

  const insert = db.prepare(`
    INSERT INTO clients (name, email, phonenumber, status) 
    VALUES (?, ?, ?, ?)
  `);

  for (let i = 0; i < clientCount; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });
    const phone = faker.phone.number({ style: 'international' });
    const status = faker.helpers.arrayElement(['active', 'inactive']); // Random status

    insert.run(name, email, phone, status);
  }
 
}
