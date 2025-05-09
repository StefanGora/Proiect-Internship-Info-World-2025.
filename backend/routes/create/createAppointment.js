import express from 'express';

const router = express.Router();

export default function createAppointmentsRouter(db) {
  router.post('/', (req, res) => {
    const {
      client_id,
      car_id,
      action,
      contact_method
    } = req.body;

    // Validate required fields
    if (!client_id || !car_id || !action || !contact_method) {
      return res.status(400).json({
        error: '🚨 Missing required fields'
      });
    }

    // Validate contact_method
    const validContactMethods = ['email', 'phone', 'in_person'];
    if (!validContactMethods.includes(contact_method)) {
      return res.status(400).json({
        error: `🚨 Invalid contact method. Must be one of: ${validContactMethods.join(', ')}`
      });
    }

    try {
      // Check if the car belongs to the client
      const ownershipCheck = db.prepare(`
        SELECT 1 FROM cars WHERE id = ? AND client_id = ?
      `).get(car_id, client_id);

      if (!ownershipCheck) {
        return res.status(400).json({
          error: '🚨 Car ID does not belong to the specified client'
        });
      }

      const insert = db.prepare(`
        INSERT INTO appointments (
          client_id, car_id, action, contact_method, status
        )
        VALUES (?, ?, ?, ?, 'pending')
      `);

      const result = insert.run(
        client_id,
        car_id,
        action,
        contact_method
      );

      res.status(201).json({
        message: '✅ Appointment request submitted successfully.',
        appointmentId: result.lastInsertRowid
      });
    } catch (error) {
      console.error('Failed to insert appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
