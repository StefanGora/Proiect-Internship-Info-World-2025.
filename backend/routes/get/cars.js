import express from 'express';

const router = express.Router();

export default function getCarsRouter(db) {
  router.get('/', (req, res) => {
    try {
      const cars = db.prepare('SELECT * FROM cars').all();

      if (cars.length === 0) {
        return res.status(404).json({
          error: '🚨 No cars found. Try seeding the database or checking your data.'
        });
      }

      res.json(cars);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
