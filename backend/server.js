import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js'; // Ensure the correct file extension is used

const app = express();

// Configure CORS to allow requests from your specific origin
const corsOptions = {
  origin: 'http://3.145.91.214:3000', // Replace with your frontend's origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/users', async (req, res) => {
  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ message: 'Rellene todos los campos por favor.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, phone, birthday) VALUES (?, ?, ?)',
      [name, phone, birthday]
    );
    res.status(200).json({ message: 'Guardado exitosamente!', id: result.insertId });
  } catch (error) {
    console.error('Error during database operation:', error.message, error.stack);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Read
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error during database operation:', error.message, error.stack);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error during database operation:', error.message, error.stack);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update
app.put('/users/:id', async (req, res) => {
  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ message: 'Rellene todos los campos por favor.' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, phone = ?, birthday = ? WHERE id = ?',
      [name, phone, birthday, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Actualizado exitosamente!' });
  } catch (error) {
    console.error('Error during database operation:', error.message, error.stack);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Delete
app.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente!' });
  } catch (error) {
    console.error('Error during database operation:', error.message, error.stack);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
