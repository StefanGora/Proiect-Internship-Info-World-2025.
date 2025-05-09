import express from 'express';

const router = express.Router();

export default function createCarsRouter(db) {
  router.post('/', (req, res) => {
    const {
      client_id,
      license_plate,
      chassis_number,
      brand,
      model,
      year,
      engine_type,
      engine_capacity,
      horsepower,
      kw_power
    } = req.body;

    // Validate required fields
    if (
      !client_id ||
      !license_plate ||
      !brand ||
      !model ||
      !year ||
      !engine_type ||
      !horsepower ||
      !kw_power
    ) {
      return res.status(400).json({
        error: '🚨 Missing required fields'
      });
    }

    // Validate engine_type values
    const validEngineTypes = ['diesel', 'benzina', 'hybrid', 'electric'];
    if (!validEngineTypes.includes(engine_type)) {
      return res.status(400).json({
        error: `🚨 Invalid engine type. Must be one of: ${validEngineTypes.join(', ')}`
      });
    }

    try {
      const insert = db.prepare(`
        INSERT INTO cars (
          client_id, license_plate, chassis_number,
          brand, model, year, engine_type,
          engine_capacity, horsepower, kw_power
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = insert.run(
        client_id,
        license_plate,
        chassis_number,
        brand,
        model,
        year,
        engine_type,
        engine_capacity,
        horsepower,
        kw_power
      );

      res.status(201).json({
        message: '✅ Car added successfully.',
        carId: result.lastInsertRowid
      });
    } catch (error) {
      console.error('Failed to insert car:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
