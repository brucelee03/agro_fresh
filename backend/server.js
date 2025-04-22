import express from 'express';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({connected: true, time: result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({connected: false, error: error.message});
  } finally {
    pool.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});