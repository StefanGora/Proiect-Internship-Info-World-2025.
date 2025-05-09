import express from 'express';

const router = express.Router();

export default function createClientsRouter(db) {
  router.post('/', (req, res) => {
    const { name, phonenumber, email } = req.body;

    // Validate required fields
    if (!name || !email || !phonenumber) {
      return res.status(400).json({
        error: '🚨 "name" and "email and phonenumber" are required fields.'
      });
    }

    try {
      const insert = db.prepare(`
        INSERT INTO clients (name, phonenumber, email, status)
        VALUES (?, ?, ?, 'active')
      `);
      const result = insert.run(name, phonenumber, email);

      res.status(201).json({
        message: '✅ Client added successfully.',
        clientId: result.lastInsertRowid
      });
    } catch (error) {
      console.error('Failed to insert client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
