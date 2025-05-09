import express from 'express';

const router = express.Router();

export default function getHistoryRouter(db) {
  router.get('/', (req, res) => {
    try {
      const history = db.prepare('SELECT * FROM history').all();

      if (history.length === 0) {
        return res.status(404).json({
          error: '🚨 No history found. Try seeding the database or checking your data.'
        });
      }

      res.json(history);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
