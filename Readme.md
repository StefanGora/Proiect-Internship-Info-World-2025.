# 🚗 Service Car Application

This application implements a car service management platform where clients can register, add their vehicles, and schedule service appointments, while administrators can manage client data, service histories, and appointment availability. The platform ensures a smooth workflow for booking, tracking, and logging service actions.

Initially, I attempted to build the frontend using Angular, as requested. However, since it was my first experience with Angular, I was only able to progress to a certain point. Despite this, I wanted to demonstrate my understanding of frontend architecture, so I also built a React-based client application. In doing so, I followed a modular structure similar to Angular's component-based approach, using TypeScript and Vite to organize and scale the app effectively.

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Install dependencies**:
    ```bash
    npm install
3. **Set up environment variables**
    ```bash
    npm run generate-env

## 🛠 Environment Variables
This project uses [dotenv](https://github.com/motdotla/dotenv) to manage environment variables.
You can **generate them automatically** using the script at `backend/scripts/generate-env.sh`, or set them up manually.

### Manual Setup
1. **For development**: Create a `.env.development` file in the `backend/` directory with the following content:
    ```
    NODE_ENV=development
    PORT=3000
    ```

2. **For production**: Create a `.env.production` file in the `backend/` directory with the following content:
    ```
    NODE_ENV=production
    PORT=8080
    ```

You can choose different port numbers either in the script file or the manual aproach if the default ones are unavailable.

## 🚀 Available Commands

| Command        | Purpose                                                        |
|----------------|----------------------------------------------------------------|
| `npm run dev`  | Start the server in **development mode** (auto-restart on changes) |
| `npm run prod` | Start the server in **production mode** (manual restart required) |
| `npm start`    | Start the server using the basic **server.js** (default start)  |
| `npm run generate-env`| Automatically generate `.env.development` and `.env.production` files in `backend/` |


## ⚙️ Project Structure

### backend/
backend/
├── .env.development           # Environment variables for development mode
├── .env.production            # Environment variables for production mode
├── .gitignore                 # Git ignore rules
├── .nvmrc                     # Node.js version file
├── server.js                  # Main Express server entry point
├── package.json               # Project metadata and scripts
├── node_modules/              # Installed npm packages
├── generate-env.sh            # Script to auto-generate .env files

# Database files
├── database.js                # In-memory SQLite setup
├── schema.js                  # Database schema definitions
├── seed.js                    # Master DB seeding script
├── clientsSeed.js             # Seeds sample clients
├── carsSeed.js                # Seeds sample cars
├── appointmentsSeed.js        # Seeds sample appointments
├── historySeed.js             # Seeds service history

# Route handlers
├── createAppointment.js       # Create appointment with validation
├── createCar.js               # Add car for a client
├── createClient.js            # Register new client
├── createHistoryEntry.js      # Log service history

├── appointments.js            # Get all appointments
├── cars.js                    # Get all cars
├── clients.js                 # Get all clients
├── getCarHistory.js           # Get service history by car
├── getClientAppointments.js   # Get appointments by client
├── getClientCars.js           # Get cars by client
├── history.js                 # Get full service history

├── patchAppointments.js       # Update appointment details
├── patchClients.js            # Update client info
├── patchHistory.js            # Update history record

# Utilities
├── checkAvailability.js       # Check appointment time slot availability

### frontend/  
Some Angulara Prototype 

### frontend-react/
frontend-react/
├── public/                  # Static assets (HTML, icons, etc.)
├── App.tsx                  # Root React component
├── main.tsx                 # Entry point for React + Vite
├── assets/                  # Global CSS and media files
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── models/                  # TypeScript data models
├── pages/                   # Route-level page components
├── types/                   # Global type definitions
├── vite.config.ts           # Vite configuration file
├── package.json             # Frontend dependencies and scripts
├── tsconfig.json            # TypeScript compiler config
└──  tsconfig.node.json       # Node-specific TS config for tooling



## 📄 Database Schema

The project uses an **in-memory SQLite** database with the following tables:

### `clients`
- **id** — Primary key
- **name** — Client's full name
- **phonenumber** — Client's phone number
- **email** — Client's email address
- **status** — Status (`active` or `inactive`)
- **created_at**, **updated_at** — Timestamps for tracking creation and updates

### `admins`
- **id** — Primary key
- **name** — Admins's name

### `cars`
- **id** — Primary key
- **client_id** — Foreign key linking to `clients`
- **license_plate** — License plate number
- **chassis_number** — Car's chassis number
- **brand**, **model**, **year** — Basic car details
- **engine_type** — One of: `'diesel'`, `'benzina'`, `'hybrid'`, `'electric'`
- **engine_capacity** — Engine size
- **horsepower**, **kw_power** — Engine power
- **created_at**, **updated_at** — Timestamps

### `appointments`
- **id** — Primary key
- **client_id**, **car_id** — Foreign keys linking to `clients` and `cars`
- **appointment_day** — Date of appointment
- **appointment_time** — Time slot (between `08:00`–`17:00`, every 30 minutes)
- **action** — Action requested (e.g., "inspection", "repair")
- **contact_method** — How the client prefers to be contacted (`email`, `phone`, `in_person`)
- **status** — Status (`pending`, `completed`, `canceled`)
- **created_at**, **updated_at** — Timestamps

### `history`
- **id** — Primary key
- **client_id**, **car_id**, **appointment_id** — Foreign keys linking to `clients`, `cars`, and `appointments`
- **visual_inspection** — Notes about the first visual inspection (scratches, damages, etc.)
- **work_performed** — Operations performed (repairs, replaced parts, findings)
- **repair_duration** — Total repair time (in minutes, multiple of 10)
- **created_at**, **updated_at** — Timestamps

## 📥 How to Seed the Database

The project includes a simple seeding system to populate the in-memory SQLite database with sample data for development and testing.

The seeding logic is handled in: **backend/db/seed/seed.js**

It performs the following steps:  
1. **(Optional)** Clears existing tables if `clearExisting` is set to `true`.  
2. **Initializes the database schema** by creating all necessary tables (`clients`, `cars`, `appointments`, `history`).  
3. **Inserts sample data** into each table using **[@faker-js/faker](https://github.com/faker-js/faker)** to generate realistic fake client names, car models, appointment details, and service histories.  
   - **Note**: The number of entries generated in the `history` table will match the number of `appointments` generated (i.e., one history record per appointment).


### Example Usage
```javascript
seedDatabase(db, { 
  clientCount: 30, 
  carCount: 60, 
  appointmentCount: 120, 
  clearExisting: true 
});