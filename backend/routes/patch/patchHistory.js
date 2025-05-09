import express from 'express';

const router = express.Router();

export default function patchHistoryRouter(db) {
  router.patch('/', (req, res) => {
    const {
      client_id,
      car_id,
      appointment_id,
      visual_inspection,
      work_performed,
      repair_duration
    } = req.body;

    // Validate required identifiers
    if (!client_id || !car_id || !appointment_id) {
      return res.status(400).json({
        error: '❗ Missing client_id, car_id, or appointment_id'
      });
    }

    // Validate repair_duration if present
    if (
      repair_duration !== undefined &&
      (repair_duration % 10 !== 0 || repair_duration < 0)
    ) {
      return res.status(400).json({
        error: '🚨 repair_duration must be a positive integer multiple of 10 (minutes)'
      });
    }

    // Build the dynamic update query
    const fields = [];
    const values = [];

    if (visual_inspection !== undefined) {
      fields.push('visual_inspection = ?');
      values.push(visual_inspection);
    }

    if (work_performed !== undefined) {
      fields.push('work_performed = ?');
      values.push(work_performed);
    }

    if (repair_duration !== undefined) {
      fields.push('repair_duration = ?');
      values.push(repair_duration);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: '⚠️ No fields provided to update' });
    }

    // Always update timestamp
    fields.push('updated_at = CURRENT_TIMESTAMP');

    const query = `
      UPDATE history
      SET ${fields.join(', ')}
      WHERE client_id = ? AND car_id = ? AND appointment_id = ?
    `;

    try {
      const result = db.prepare(query).run(
        ...values,
        client_id,
        car_id,
        appointment_id
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: '❌ No matching history record found' });
      }

      res.json({ message: '✅ History updated successfully' });
    } catch (error) {
      console.error('Failed to update history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
