// Importar y configurar dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express'); // Importar Express para crear el servidor
const mongoose = require('mongoose'); // Importar Mongoose para interactuar con MongoDB
const cors = require('cors'); // Importar CORS para permitir peticiones desde otros dominios

const app = express(); // Inicializar la aplicación de Express
const PORT = process.env.PORT || 3000; // Definir el puerto del servidor (3000 por defecto)
const MONGODB_URL = process.env.MONGODB_URL; // Obtener la URL de conexión a MongoDB de las variables de entorno

// === MIDDLEWARES ===

// Configuración de CORS: Permite que el frontend (ej: localhost:3001) se comunique con este backend
app.use(cors({
  origin: ['http://localhost:3001', 'https://angelixflorez.github.io'], // Permitir frontend local y desplegado
  credentials: true
}));

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones entrantes como JSON

// === CONEXIÓN A BASE DE DATOS ===

// Conectar a la base de datos MongoDB usando Mongoose
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas'); // Mensaje de éxito
  })
  .catch(err => {
    console.log('Error de conexión a MongoDB:', err.message); // Mensaje de error
    process.exit(1); // Terminar el proceso si falla la conexión
  });

// === RUTAS ===

// Importar los archivos de rutas
const juegoRoutes = require('./routes/juegoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

// Definir las rutas base para la API
app.use('/api/juegos', juegoRoutes); // Rutas relacionadas con juegos
app.use('/api/resenas', resenaRoutes); // Rutas relacionadas con reseñas

// === INICIAR SERVIDOR ===

// Poner el servidor a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
