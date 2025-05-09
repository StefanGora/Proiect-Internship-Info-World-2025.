import Database from 'better-sqlite3';

// Initialize and return the database instance
export function initializeDatabase() {
  const db = new Database(':memory:');  
  return db;
}
