import express from 'express';

const router = express.Router();

export default function pendingAppointmentsRouter(db) {
  router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const appointments = db.prepare(`
        SELECT 
          appointments.*,
          clients.name AS client_name,
          cars.brand || ' ' || cars.model AS car_name
        FROM appointments
        JOIN cars ON appointments.car_id = cars.id
        JOIN clients ON cars.client_id = clients.id
        WHERE appointments.status = 'pending'
        ORDER BY appointments.appointment_day
        LIMIT ? OFFSET ?
      `).all(limit, offset);

      if (appointments.length === 0) {
        return res.status(404).json({
          error: '🚨 No pending appointments found. Try seeding the database or checking your data.'
        });
      }

      res.json(appointments);
    } catch (error) {
      console.error('Failed to fetch pending appointments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
