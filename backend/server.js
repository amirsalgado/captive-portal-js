// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API endpoint to save form data
app.post('/submit', async (req, res) => {
  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).send('Rellene todos los campos por favor.');
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, phone, birthday) VALUES (?, ?, ?)',
      [name, phone, birthday]
    );
    res.status(200).json({ message: 'Guardado exitosamente!', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// API endpoint to get all data
app.get('/data', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// API endpoint to get a single user
app.get('/data/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// API endpoint to update a user
app.put('/data/:id', async (req, res) => {
  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).send('Rellene todos los campos por favor.');
  }

  try {
    const [result] = await db.query(
      'UPDATE users SET name = ?, phone = ?, birthday = ? WHERE id = ?',
      [name, phone, birthday, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }
    res.status(200).send('Usuario actualizado exitosamente!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// API endpoint to delete a user
app.delete('/data/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Usuario no encontrado.');
    }
    res.status(200).send('Usuario eliminado exitosamente!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
