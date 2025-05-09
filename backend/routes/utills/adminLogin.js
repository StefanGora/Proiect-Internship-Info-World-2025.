import express from 'express';

const router = express.Router();

export default function loginAdmin(db) {
  router.get('/', (req, res) => {
    try {
      const admin = db.prepare(`
        SELECT * FROM admins 
        LIMIT 1
      `).get();

      if (!admin) {
        return res.status(404).json({
          error: '🚨 No active clients found. Try seeding the database or checking your data.'
        });
      }

      res.json({ adminId: admin.id });
    } catch (error) {
      console.error('Failed to fetch client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
