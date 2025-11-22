const Resena = require('../models/Resena'); // Importa el modelo Resena de Mongoose

// C - Crear reseña
// Esta función crea una nueva reseña en la base de datos.
// Espera recibir los datos de la reseña en el cuerpo de la solicitud (req.body).
// Si la creación es exitosa, devuelve la reseña creada con un código de estado 201.
// Si ocurre un error (por ejemplo, validación fallida), devuelve un código 400 con detalles del error.
exports.crearResena = async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body); // Crea un objeto Resena con los datos enviados en el body
        await nuevaResena.save(); // Guarda la reseña en la base de datos
        res.status(201).json(nuevaResena); // Retorna la reseña creada con código 201
    } catch (error) {
        res.status(400).json({ // Si hay error en los datos enviados
            error: 'Error al crear la reseña',
            details: error.message
        });
    }
};

// R - Obtener todas las reseñas
// Esta función recupera todas las reseñas de la base de datos.
// Permite filtrar opcionalmente por el ID del juego si se proporciona 'juegoId' en los parámetros de consulta (query params).
// Utiliza 'populate' para incluir el título del juego asociado en la respuesta.
// Devuelve la lista de reseñas con un código de estado 200.
exports.obtenerResenas = async (req, res) => {
    try {
        // Permite filtrar reseñas por el ID del juego si se envía en la query
        const filtro = req.query.juegoId ? { juegoId: req.query.juegoId } : {};

        // Busca reseñas y trae el nombre del juego relacionado usando populate
        const resenas = await Resena.find(filtro).populate('juegoId', 'titulo');
        res.status(200).json(resenas); // Retorna las reseñas con código 200
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas' }); // Error del servidor
    }
};

// R - Obtener reseña por ID
// Esta función busca una reseña específica por su ID.
// También popula el campo 'juegoId' para incluir el título del juego.
// Si la reseña no existe, devuelve un código 404.
// Si se encuentra, devuelve la reseña con un código 200.
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id).populate('juegoId', 'titulo'); // Busca reseña por ID y trae el nombre del juego

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada' }); // Si no existe, retorna 404
        }

        res.status(200).json(resena); // Retorna la reseña con código 200
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la reseña' }); // Error del servidor
    }
};

// U - Actualizar reseña
// Esta función actualiza una reseña existente identificada por su ID.
// Recibe los nuevos datos en el cuerpo de la solicitud.
// La opción { new: true } asegura que se devuelva el documento actualizado.
// La opción { runValidators: true } asegura que los nuevos datos cumplan con el esquema del modelo.
// Si la reseña no se encuentra, devuelve un código 404.
exports.actualizarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Retorna la reseña actualizada
            runValidators: true // Valida los campos según el modelo
        });

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada para actualizar' }); // Si no existe
        }

        res.status(200).json(resena); // Retorna la reseña actualizada con código 200
    } catch (error) {
        res.status(400).json({ // Error en los datos enviados
            error: 'Error al actualizar la reseña.',
            details: error.message
        });
    }
};

// D - Eliminar reseña
// Esta función elimina una reseña de la base de datos por su ID.
// Si la reseña no se encuentra, devuelve un código 404.
// Si se elimina correctamente, devuelve un mensaje de éxito con código 200.
exports.eliminarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndDelete(req.params.id); // Busca y elimina la reseña por ID

        if (!resena) {
            return res.status(404).json({ msg: 'Reseña no encontrada para eliminar' }); // Si no existe
        }

        res.status(200).json({ msg: 'Reseña eliminada exitosamente' }); // Confirmación de eliminación
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reseña' }); // Error del servidor
    }
};

// Obtener reseñas por Juego (Endpoint específico)
// Esta función es una alternativa para obtener todas las reseñas de un juego específico.
// Busca reseñas donde 'juegoId' coincida con el parámetro de la ruta.
// Popula el título del juego.
exports.obtenerResenasPorJuego = async (req, res) => {
    try {
        const resenas = await Resena.find({ juegoId: req.params.juegoId })
            .populate('juegoId', 'titulo');
        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reseñas del juego' });
    }
};