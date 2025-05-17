import { PGlite } from '@electric-sql/pglite';

let dbInstance = null;

export async function getDb() {
    if (!dbInstance) {
      try {
        console.log("Initializing database for the first time");
        dbInstance = new PGlite("idb://patient-table-db");  
        await dbInstance.exec(`
          CREATE TABLE IF NOT EXISTS patientsDB(
            id SERIAL PRIMARY KEY,
            name TEXT,
            gender TEXT,
            age INTEGER,
            ailment TEXT
          );
        `);       
        console.log("Db initialized successfully");
      } catch (error) {
        console.error("Database initialization error:", error);
        throw error; 
      }
    }
    return dbInstance;
  }