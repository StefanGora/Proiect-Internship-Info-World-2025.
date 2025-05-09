export function initializeSchema(db) {
    console.log("📝 Creating tables if they don't exist...");
  
    db.exec(`
      -- Create clients table 
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique identifier for the client
        name TEXT NOT NULL,                      -- Client's name
        phonenumber VARCHAR,                     -- Client's phone number
        email VARCHAR NOT NULL,                  -- Client's email
        status TEXT DEFAULT 'active',            -- Client's status (active/inactive)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp when the client was added
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- Timestamp of the last update
      );
    `);

    db.exec(`
      -- Create admins table
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique identifier for the admin
        name TEXT NOT NULL                       -- Admins's name
      );
    `);
    
      db.exec(`
        -- Create cars table 
        CREATE TABLE IF NOT EXISTS cars (
          id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique identifier for the car
          client_id INTEGER,                       -- Client ID (foreign key, relates to clients table)
          license_plate VARCHAR,                   -- Car's license plate
          chassis_number VARCHAR,                  -- Car's chassis number
          brand VARCHAR,                           -- Car's brand
          model VARCHAR,                           -- Car's model
          year INTEGER,                            -- Year of manufacture
          engine_type TEXT CHECK(engine_type IN ('diesel', 'benzina', 'hybrid', 'electric')), -- Engine type (diesel, gasoline, hybrid, electric)
          engine_capacity DECIMAL,                 -- Engine capacity
          horsepower INTEGER,                      -- Horsepower (in HP)
          kw_power DECIMAL,                        -- Power in kW (calculated from horsepower or vice versa)
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp when the car was added
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of the last update
          FOREIGN KEY (client_id) REFERENCES clients(id)  -- Foreign key linking to the clients table
        );
      `);

      db.exec(`
        -- Create appointments table 
        CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for the appointment
          client_id INTEGER,                    -- Foreign key to clients table
          car_id INTEGER,                       -- Foreign key to cars table
          appointment_day DATE,                 -- Store the date of appointment day
          appointment_time TEXT CHECK (
            appointment_time IN ('08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
                                 '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
                                 '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00')
          ), -- Ensures appointments are only in the 08:00 - 17:00 range and on 30-minute intervals
          action VARCHAR NOT NULL,              -- Action requested (e.g., maintenance, repair)
          contact_method TEXT CHECK(contact_method IN ('email', 'phone', 'in_person')),  -- Contact method for appointment
          status TEXT CHECK(status IN ('pending', 'accepted', 'completed', 'canceled')) DEFAULT 'pending', -- Appointment status
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp when the appointment was created
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp of the last update
          FOREIGN KEY(client_id) REFERENCES clients(id),    -- Foreign key to clients table
          FOREIGN KEY(car_id) REFERENCES cars(id)           -- Foreign key to cars table
        );
      `);

      db.exec(`
        -- Create history table
        CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,        -- Unique identifier for the history entry
          client_id INTEGER NOT NULL,                  -- Foreign key to clients table
          car_id INTEGER NOT NULL,                     -- Foreign key to cars table
          appointment_id INTEGER NOT NULL,             -- Foreign key to appointments table
          visual_inspection TEXT,                      -- Notes from the first visual inspection
          work_performed TEXT,                         -- Work done (repairs, parts replaced, etc.)
          repair_duration INTEGER,                     -- Repair duration in minutes (multiple of 10)
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp when the entry was created
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp when the entry was last updated
          FOREIGN KEY (client_id) REFERENCES clients(id),     -- Foreign key to clients table
          FOREIGN KEY (car_id) REFERENCES cars(id),           -- Foreign key to cars table
          FOREIGN KEY (appointment_id) REFERENCES appointments(id) -- Foreign key to appointments table
        );
      `);
    
}
  
  