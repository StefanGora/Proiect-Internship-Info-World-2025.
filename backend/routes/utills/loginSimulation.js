import express from 'express';

const router = express.Router();

export default function loginSimulation(db) {
  router.get('/', (req, res) => {
    try {
      const client = db.prepare(`
        SELECT * FROM clients 
        WHERE status = 'active' 
        ORDER BY RANDOM() 
        LIMIT 1
      `).get();

      if (!client) {
        return res.status(404).json({
          error: '🚨 No active clients found. Try seeding the database or checking your data.'
        });
      }

      res.json({ clientId: client.id });
    } catch (error) {
      console.error('Failed to fetch client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
