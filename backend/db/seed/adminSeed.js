/**
 * Insert a specified number of clients into the database
 * @param {object} db - The SQLite database instance
 */
export function insertAdmin(db) {
    console.log(`🛠️  Inserting admin user into the database...`);

  const insert = db.prepare(`
    INSERT INTO admins (name) 
    VALUES (?)
  `);

  insert.run("admin");
 
}
