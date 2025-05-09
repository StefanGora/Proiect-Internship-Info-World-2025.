import express from 'express';

const router = express.Router();

export default function getClientCarsRouter(db) {
  
  router.get('/:clientId/cars', (req, res) => {
    const { clientId } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
  
    if (!clientId || isNaN(clientId)) {
      return res.status(400).json({
        error: '🚨 A valid clientId must be provided in the URL.'
      });
    }
  
    try {
      const cars = db.prepare(`
        SELECT * FROM cars
        WHERE CAST(client_id AS TEXT) = ?
        ORDER BY brand
        LIMIT ? OFFSET ?
        
      `).all(clientId, limit, offset);
  
      res.status(200).json(cars);
    } catch (error) {
      console.error('Failed to fetch cars for client:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  return router;
}
