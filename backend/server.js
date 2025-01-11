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
    return res.status(400).send('All fields are required.');
  }

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, phone, birthday) VALUES (?, ?, ?)',
      [name, phone, birthday]
    );
    res.status(200).send({ message: 'Data saved successfully!', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
