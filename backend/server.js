import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { initializeDatabase } from './db/database.js';  // Import from database.js
import { seedDatabase } from './db/seed/seed.js';            // Import from seed.js
import loginSimulation from './routes/utills/loginSimulation.js';
import loginAdmin from './routes/utills/adminLogin.js';
import getClientsRouter from './routes/get/clients.js';
import getCarsRouter from './routes/get/cars.js';
import pendingAppointmentsRouter from './routes/get/pendingAppointments.js';
import acceptedAppointmentsRouter from './routes/get/accetedAppointments.js';
import getHistoryRouter from './routes/get/history.js';
import createClientsRouter from './routes/create/createClient.js';
import createCarsRouter from './routes/create/createCar.js';
import createAppointmentsRouter from './routes/create/createAppointment.js';
import createHistoryEntryRouter from './routes/create/createHistoryEntry.js';
import getClientCarsRouter from './routes/get/getClientCars.js';
import getClientAppointmentsRouter from './routes/get/getClientAppointments.js';
import getCarHistoryRouter from './routes/get/getCarHistory.js';
import getAvailabilityRouter from './routes/utills/checkAvailability.js';
import getClientsByIdRouter from './routes/get/getClientById.js';
import patchClientRouter from './routes/patch/patchClients.js';
import patchAppointmentRouter from './routes/patch/patchAppointments.js';
import patchHistoryRouter from './routes/patch/patchHistory.js';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Initialize the database and seed data
const db = initializeDatabase();

const CLIENT_COUNT = 100;
const CAR_COUNT = 2000;
const APPOINTMENT_COUNT = 3000;
const CLEAR_EXISTING = true;

seedDatabase(db, {
  clientCount: CLIENT_COUNT,
  carCount: CAR_COUNT,
  appointmentCount: APPOINTMENT_COUNT,
  clearExisting: CLEAR_EXISTING
});

app.use('/api/login/clients', loginSimulation(db));
app.use('/api/login/admins', loginAdmin(db));

//Routes to get all table data
app.use('/api/get/clients', getClientsRouter(db));
app.use('/api/get/cars', getCarsRouter(db));
app.use('/api/get/history', getHistoryRouter(db));

//Routes to get admin data
app.use('/api/get/appointments/pending', pendingAppointmentsRouter(db));
app.use('/api/get/appointments/accepted', acceptedAppointmentsRouter(db));

//Patch routes
app.use('/api/patch/clients', patchClientRouter(db));
app.use('/api/patch/appointments', patchAppointmentRouter(db));
app.use('/api/patch/history', patchHistoryRouter(db));


//Routes to get client data
app.use('/api/get/clients', getClientCarsRouter(db));
app.use('/api/get/client-by-id', getClientsByIdRouter(db));
app.use('/api/get/clients', getClientAppointmentsRouter(db));
app.use('/api/get/availability', getAvailabilityRouter(db));
app.use('/api/get/cars', getCarHistoryRouter(db));

//Routes to insert data into tables 
app.use('/api/create/clintes', createClientsRouter(db));
app.use('/api/create/cars', createCarsRouter(db));
app.use('/api/create/appointments', createAppointmentsRouter(db));
app.use('/api/create/history', createHistoryEntryRouter(db));




app.get('/', (req, res) => {
  res.send('Hello');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
