import express from 'express';

const router = express.Router();

export default function patchClientRouter(db) {
  router.patch('/:id', (req, res) => {
    const clientId = req.params.id;
    const { name, phonenumber, email, status } = req.body;

    if (!name && !phonenumber && !email && !status) {
      return res.status(400).json({ error: '🚨 No fields to update.' });
    }

    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (phonenumber) {
      fields.push('phonenumber = ?');
      values.push(phonenumber);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (status) {
      fields.push('status = ?');
      values.push(status);
    }

    // Always update the timestamp
    fields.push('updated_at = CURRENT_TIMESTAMP');

    const sql = `
      UPDATE clients
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    values.push(clientId);

    try {
      const result = db.prepare(sql).run(...values);
      if (result.changes === 0) {
        return res.status(404).json({ error: '🚨 Client not found.' });
      }
      res.json({ message: '✅ Client updated successfully.' });
    } catch (err) {
      console.error('Failed to update client:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
