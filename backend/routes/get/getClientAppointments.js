import express from 'express';

const router = express.Router();

export default function getClientAppointmentsRouter(db) {

  router.get('/:clientId/appointments', (req, res) => {
    const { clientId } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
  
    if (!clientId || isNaN(clientId)) {
      return res.status(400).json({
        error: '🚨 A valid clientId must be provided in the URL.'
      });
    }
  
    try {
      const appointments = db.prepare(`
        SELECT 
          a.id,
          a.client_id,
          a.car_id,
          c.brand,
          c.model,
          a.appointment_day,
          a.appointment_time,
          a.action,
          a.contact_method,
          a.status,
          a.created_at,
          a.updated_at
        FROM appointments a
        JOIN cars c ON a.car_id = c.id
        WHERE a.client_id = ? AND a.status = ?
        ORDER BY a.appointment_day ASC, a.appointment_time ASC
        LIMIT ? OFFSET ?
      `).all(clientId, "accepted", limit, offset);
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Failed to fetch appointments for client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  return router;
}
