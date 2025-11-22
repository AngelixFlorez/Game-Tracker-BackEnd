const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// Definición de rutas para la entidad 'Resena'

// GET /api/resenas
// Ruta para obtener todas las reseñas.
// Soporta filtrado por juegoId a través de query params.
router.get('/', resenaController.obtenerResenas);

// GET /api/resenas/juego/:juegoId
// Ruta específica para obtener todas las reseñas asociadas a un juego en particular.
router.get('/juego/:juegoId', resenaController.obtenerResenasPorJuego);

// POST /api/resenas
// Ruta para crear una nueva reseña.
router.post('/', resenaController.crearResena);

// GET /api/resenas/:id
// Ruta para obtener una reseña específica por su ID.
router.get('/:id', resenaController.obtenerResenaPorId);

// PUT /api/resenas/:id
// Ruta para actualizar una reseña existente por su ID.
router.put('/:id', resenaController.actualizarResena);

// DELETE /api/resenas/:id
// Ruta para eliminar una reseña por su ID.
router.delete('/:id', resenaController.eliminarResena);

module.exports = router;
