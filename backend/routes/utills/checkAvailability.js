import express from 'express';

const router = express.Router();

const validTimes = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function getAvailabilityRouter(db) {
  router.get('/', (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Get all accepted appointments from today onward
      const appointments = db.prepare(`
        SELECT appointment_day, appointment_time
        FROM appointments
        WHERE appointment_day >= ? AND status = 'accepted'
      `).all(today);

        // Step 1: group by day
        const grouped = {};
        appointments.forEach(({ appointment_day, appointment_time }) => {
          if (!grouped[appointment_day]) {
            grouped[appointment_day] = new Set();
          }
          grouped[appointment_day].add(appointment_time);
        });
  
        // Step 2: build availability object
        const availability = {};
        const daysToCheck = 14;
  
        for (let i = 0; i < daysToCheck; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
  
          const bookedTimes = grouped[dateStr] || new Set();
          const freeTimes = validTimes.filter(t => !bookedTimes.has(t));
  
          if (freeTimes.length > 0) {
            availability[dateStr] = freeTimes;
          }
        }
  
        res.json({ availability });
    } catch (err) {
      console.error('Failed to fetch availability:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
