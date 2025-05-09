import express from 'express';

const router = express.Router();

const validTimes = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

const validContactMethods = ['email', 'phone', 'in_person'];
const validStatuses = ['pending', 'accepted', 'completed', 'canceled'];

export default function patchAppointmentsRouter(db) {
  router.patch('/:id', (req, res) => {
    const appointmentId = req.params.id;
    const {
      appointment_day,
      appointment_time,
      action,
      contact_method,
      status
    } = req.body;

    // Validate constraints
    if (appointment_time && !validTimes.includes(appointment_time)) {
      return res.status(400).json({ error: '🚨 Invalid appointment time' });
    }

    if (contact_method && !validContactMethods.includes(contact_method)) {
      return res.status(400).json({ error: '🚨 Invalid contact method' });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: '🚨 Invalid status' });
    }

    // Build dynamic SQL update
    const fields = [];
    const values = [];

    if (appointment_day) {
      fields.push('appointment_day = ?');
      values.push(appointment_day);
    }

    if (appointment_time) {
      fields.push('appointment_time = ?');
      values.push(appointment_time);
    }

    if (action) {
      fields.push('action = ?');
      values.push(action);
    }

    if (contact_method) {
      fields.push('contact_method = ?');
      values.push(contact_method);
    }

    if (status) {
      fields.push('status = ?');
      values.push(status);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: '⚠️ No fields provided to update' });
    }

    // Always update updated_at
    fields.push('updated_at = CURRENT_TIMESTAMP');

    const query = `
      UPDATE appointments
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    try {
      const result = db.prepare(query).run(...values, appointmentId);
      if (result.changes === 0) {
        return res.status(404).json({ error: '❌ Appointment not found' });
      }

      res.json({ message: '✅ Appointment updated successfully' });
    } catch (error) {
      console.error('Failed to update appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
