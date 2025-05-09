import express from 'express';

const router = express.Router();

export default function getClientsRouter(db) {
  router.get('/', (req, res) => {
    try {
      const clients = db.prepare('SELECT * FROM clients').all();

      if (clients.length === 0) {
        return res.status(404).json({
          error: '🚨 No clients found. Try seeding the database or checking your data.'
        });
      }

      res.json(clients);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
