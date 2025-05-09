import express from 'express';

const router = express.Router();

export default function getClientsByIdRouter(db) {
  router.get('/', (req, res) => {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: 'Missing client id in query.' });
    }

    try {
      const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json(client);
    } catch (error) {
      console.error('Failed to fetch client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  return router;
}
