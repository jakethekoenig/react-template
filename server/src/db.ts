import Database from 'better-sqlite3';

// Add a function to create a database connection
export function createDatabase(dbPath?: string) {
  const db = new Database(dbPath || 'notes.db');
  
  // Create notes table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  return db;
}

// Export the default database instance
export default createDatabase();
