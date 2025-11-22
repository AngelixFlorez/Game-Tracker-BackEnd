const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');

// Definición de rutas para la entidad 'Juego'

// GET /api/juegos/search
// Ruta para buscar juegos por título.
// Se define antes de /:id para evitar conflictos de ruta.
router.get('/search', juegoController.searchJuegos);

// GET /api/juegos
// Ruta para obtener la lista completa de juegos.
router.get('/', juegoController.getJuegos);

// POST /api/juegos
// Ruta para crear un nuevo juego.
router.post('/', juegoController.createJuego);

// GET /api/juegos/:id
// Ruta para obtener los detalles de un juego específico por su ID.
router.get('/:id', juegoController.getJuegoById);

// PUT /api/juegos/:id
// Ruta para actualizar un juego existente por su ID.
router.put('/:id', juegoController.updateJuego);

// DELETE /api/juegos/:id
// Ruta para eliminar un juego por su ID.
router.delete('/:id', juegoController.deleteJuego);

module.exports = router;
