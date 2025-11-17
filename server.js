require('dotenv').config(); // Carga variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ← AHORA SÍ ESTÁ BIEN

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// === CORS: PERMITE QUE EL FRONTEND (3001) HABLE CON EL BACKEND (3000) ===
app.use(cors({
  origin: 'http://localhost:3001', // Permite solo tu frontend
  credentials: true
}));

app.use(express.json()); // Para leer JSON en las peticiones

// === CONEXIÓN A MONGODB ===
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch(err => {
    console.log('Error de conexión a MongoDB:', err.message);
    process.exit(1);
  });

// === RUTAS ===
const juegoRoutes = require('./routes/juegoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

app.use('/api/juegos', juegoRoutes);
app.use('/api/resenas', resenaRoutes);

// === INICIAR SERVIDOR ===
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
