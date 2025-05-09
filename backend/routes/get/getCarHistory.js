import express from 'express';

const router = express.Router();

export default function getCarHistoryRouter(db) {
  router.get('/:carId/history', (req, res) => {
    const { carId } = req.params;

    // Validate the carId
    if (!carId ) {
      return res.status(400).json({
        error: '🚨 A valid carId must be provided in the URL.'
      });
    }

    try {
      const history = db.prepare(`
        SELECT * FROM history
        WHERE car_id = ?
        ORDER BY created_at DESC
      `).all(carId);

      if (history.length === 0) {
        return res.status(404).json({
          error: '❌ No history entries found for the specified car.'
        });
      }

      res.status(200).json(history);
    } catch (error) {
      console.error('Failed to fetch history for car:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
