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

        await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS AppointmentDB(
          id SERIAL PRIMARY KEY,
          patient_id INTEGER,
          patient_name TEXT,
          dept TEXT,
          dName TEXT,
          description TEXT,
          FOREIGN KEY (patient_id) REFERENCES patientsDB(id)
        );
        `)
      } catch (error) {
        console.error("Database initialization error:", error);
        throw error; 
      }
    }
    return dbInstance;
  }

  