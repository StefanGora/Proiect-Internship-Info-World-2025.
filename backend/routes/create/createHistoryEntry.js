import express from 'express';

const router = express.Router();

export default function createHistoryEntryRouter(db) {
  router.post('/', (req, res) => {
    const {
      client_id,
      car_id,
      appointment_id,
      visual_inspection,
      work_performed,
      repair_duration
    } = req.body;

    // Check required fields
    if (
      !client_id ||
      !car_id ||
      !appointment_id ||
      repair_duration === undefined
    ) {
      return res.status(400).json({
        error: '🚨 Missing required fields (client_id, car_id, appointment_id, repair_duration)'
      });
    }

    // Check if repair_duration is a positive multiple of 10
    if (repair_duration <= 0 || repair_duration % 10 !== 0) {
      return res.status(400).json({
        error: '🚨 repair_duration must be a positive number and a multiple of 10.'
      });
    }

    // Check car ownership
    const car = db.prepare(`SELECT client_id FROM cars WHERE id = ?`).get(car_id);
    if (!car || car.client_id !== client_id) {
      return res.status(400).json({
        error: '🚨 Car does not belong to the specified client.'
      });
    }

    // Check appointment details match the client and car
    const appointment = db.prepare(`
      SELECT 1 FROM appointments
      WHERE id = ? AND client_id = ? AND car_id = ?
    `).get(appointment_id, client_id, car_id);

    if (!appointment) {
      return res.status(400).json({
        error: '🚨 Appointment does not match provided client_id and car_id.'
      });
    }

    try {
      const insert = db.prepare(`
        INSERT INTO history (
          client_id, car_id, appointment_id,
          visual_inspection, work_performed, repair_duration
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const result = insert.run(
        client_id,
        car_id,
        appointment_id,
        visual_inspection || null,
        work_performed || null,
        repair_duration
      );

      res.status(201).json({
        message: '✅ History entry added successfully.',
        historyId: result.lastInsertRowid
      });
    } catch (error) {
      console.error('Failed to insert history entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
