import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js'; // Asegúrate de que este archivo exista y esté configurado correctamente

const app = express();

const corsOptions = {
  origin: '*', // Permitir todas las solicitudes
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Función para validar el nombre
const isValidName = (name) => {
  const regex = /^(?!.*(.)\1{2,})[A-ZÁÉÍÓÚÑ]{3,} (?!.*(.)\1{2,})[A-ZÁÉÍÓÚÑ]+$/;
  return regex.test(name);
};

// Función para validar el teléfono
const isValidPhone = (phone) => {
  const regex = /^3\d{9}$/;
  return regex.test(phone);
};

// Función para validar la fecha de cumpleaños
const isValidBirthday = (birthday) => {
  const today = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  return birthday <= today;
};

// Crear usuario
app.post('/api/users', async (req, res) => {
  let { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ message: 'Rellene todos los campos por favor.' });
  }

  // Convertir nombre a mayúsculas
  name = name.toUpperCase().trim();

  // Validar formato de datos
  if (!isValidName(name)) {
    return res.status(400).json({ message: 'El nombre debe ser válido (Nombre Apellido, sin caracteres repetitivos o irreales).' });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ message: 'El teléfono debe tener 10 dígitos y comenzar con "3".' });
  }

  if (!isValidBirthday(birthday)) {
    return res.status(400).json({ message: 'La fecha de cumpleaños no puede ser futura.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO users (name, phone, birthday) VALUES (?, ?, ?)',
      [name, phone, birthday]
    );
    res.status(200).json({ message: 'Guardado exitosamente!', id: result.insertId });
  } catch (error) {
    console.error('Error durante la operación en la base de datos:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error durante la operación en la base de datos:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
});

// Obtener usuario por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error durante la operación en la base de datos:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
});

// Actualizar usuario
app.put('/api/users/:id', async (req, res) => {
  let { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ message: 'Rellene todos los campos por favor.' });
  }

  // Convertir nombre a mayúsculas
  name = name.toUpperCase().trim();

  // Validar formato de datos
  if (!isValidName(name)) {
    return res.status(400).json({ message: 'El nombre debe ser válido (Nombre Apellido, sin caracteres repetitivos o irreales).' });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ message: 'El teléfono debe tener 10 dígitos y comenzar con "3".' });
  }

  if (!isValidBirthday(birthday)) {
    return res.status(400).json({ message: 'La fecha de cumpleaños no puede ser futura.' });
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
    console.error('Error durante la operación en la base de datos:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
});

// Eliminar usuario
app.delete('/api/users/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente!' });
  } catch (error) {
    console.error('Error durante la operación en la base de datos:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
