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
- .env.development            # Environment variables for development mode  
- .env.production             # Environment variables for production mode  
- .gitignore                  # Files and folders ignored by Git  
- .nvmrc                      # Defines the Node.js version for the project  
- server.js                   # Main Express server file  
- package.json                # Project metadata, dependencies, and scripts  
- node_modules/               # Installed npm packages  

- scripts/  
  - generate-env.sh           # Script to auto-generate .env files  

- db/  
  - database.js               # Initialize and return an in-memory SQLite database  
  - schema.js                 # Define and create the database schema  

  - seed/  
    - seed.js                 # Main seeding script  
    - clientsSeed.js          # Client seeding module  
    - carsSeed.js             # Car seeding module  
    - appointmentsSeed.js     # Appointment seeding module  
    - historySeed.js          # History seeding module  

- routes/  
  - create/  
    - createAppointment.js    # Create appointment with validation  
    - createCar.js            # Add car for a client  
    - createClient.js         # Register new client  
    - createHistoryEntry.js   # Log service history after appointment  

  - get/  
    - appointments.js         # Get appointments  
    - cars.js                 # Get cars  
    - clients.js              # Get clients  
    - getCarHistory.js        # Get history by car ID  
    - getClientAppointments.js # Get client appointments  
    - getClientCars.js         # Get client cars  
    - history.js              # Get full service history  

  - patch/  
    - patchAppointments.js    # Update appointment fields  
    - patchClients.js         # Update client info  
    - patchHistory.js         # Update history entry  

  - utills/  
    - checkAvailability.js    # Check appointment slot availability  
 

### frontend/  
Some Angulara Prototype 

### frontend-react/
frontend-react/
- index.html                     # Main HTML file used by Vite during build and development
- package.json                   # Lists project dependencies and npm scripts
- package-lock.json              # Locks dependency versions for reproducibility
- README.md                      # Project overview and usage instructions
- tsconfig.json                  # Root TypeScript configuration
- tsconfig.app.json              # TypeScript config specific to the React app
- tsconfig.node.json             # TypeScript config for Node-related code (if any)
- vite.config.ts                 # Vite development/build configuration
- eslint.config.js               # ESLint rules for code quality
- public/                        # Public static assets (copied as-is during build)
  - vite.svg                     # Default Vite logo (can be replaced)
- src/                           # Application source code
  - App.tsx                      # Root React component containing the main layout
  - main.tsx                     # Application entry point (mounts App component)
  - vite-env.d.ts                # Vite-specific TypeScript declarations
  - assets/                      # Static frontend assets
    - css/                       # CSS styles grouped by component/page
      - AdminAppointment.css
      - App.css
      - CarForm.css
      - ClientPage.css
      - index.css
      - MakeAppointment.css
    - svg/                       # SVG graphics used in UI
      - react.svg
  - components/                  # Reusable UI components (grouped by purpose)
    - AddCarFormComponent.tsx            # Form for adding a car
    - AdminAppointmentCardComponent.tsx  # Card for admin to view/manage an appointment
    - AppointmentCardComponent.tsx       # General appointment display card
    - AppointmentListComponent.tsx       # List of appointments (for client/admin)
    - AvailabilityFormComponent.tsx      # Form to check available appointment slots
    - CarCardComponent.tsx               # UI component for displaying car info
    - CarListComponent.tsx               # Displays list of client’s cars
    - CloseTicketFormComponent.tsx       # Admin form to close appointment/ticket
    - MakeAppointmentFormComponent.tsx   # Client form to book new appointment
    - TicketComponent.tsx                # Represents a repair/service ticket
    - TicketListComponent.tsx            # List of all tickets (for admin)
    - UserProfileComponent.tsx           # Displays client profile information
  - hooks/                         # Custom React hooks for API and state logic
    - useAdminAppointments.ts       # Fetch admin appointment data
    - useAdminLogin.ts              # Handle admin login flow
    - useCancelAppointment.ts       # Cancel a client appointment
    - useCloseTicket.ts             # Submit form to close ticket
    - useGetAvailability.ts         # Get available time slots for appointments
    - useGetClientAppointments.ts   # Fetch client's appointment history
    - useGetClientById.ts           # Fetch client data by ID
    - useGetClientCars.ts           # Fetch list of client’s registered cars
    - useInsertCar.ts               # API logic to insert a new car
    - useSimulateLogin.ts           # Simulate a client login (mock session)
    - useSubmitAppointments.ts      # Submit appointment booking form
    - useUpdateAppointment.ts       # Patch/update existing appointments
  - models/                        # TypeScript data models for strong typing
    - admin-appointment.model.ts
    - appointment.model.ts
    - car.model.ts
    - client.model.ts
  - pages/                         # Top-level pages mapped to routes
    - AcceptedAppointmentsPage.tsx     # Admin view of accepted appointments
    - AdminPage.tsx                    # Main dashboard for admin
    - ClientPage.tsx                   # Main dashboard for clients
    - LoginPage.tsx                    # Login page (admin/client selection)
    - PendingAppointmentsPage.tsx      # Admin view of pending appointments
  - types/                         # Additional custom type definitions
    - appointmentFormData.ts         # Types for appointment form fields
    - carFormData.types.ts           # Types for car registration form


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
