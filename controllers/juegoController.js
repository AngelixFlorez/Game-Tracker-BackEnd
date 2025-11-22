const Juego = require('../models/Juego');

// Obtener todos los juegos
// Esta función recupera todos los juegos de la base de datos.
// Si hay un error durante la consulta, devuelve un estado 500 con el mensaje de error.
exports.getJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo juego
// Esta función crea un nuevo documento de juego en la base de datos.
// Espera que el cuerpo de la solicitud contenga los datos del juego.
// Si la creación es exitosa, devuelve el juego creado con estado 201.
// Si falla, devuelve un estado 400 con el mensaje de error.
exports.createJuego = async (req, res) => {
  const juego = new Juego(req.body);
  try {
    const nuevoJuego = await juego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un juego por ID
// Esta función busca un juego específico por su ID.
// Si el juego no se encuentra, devuelve un estado 404.
// Si se encuentra, devuelve el objeto del juego.
// Maneja errores de servidor con estado 500.
exports.getJuegoById = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un juego
// Esta función actualiza un juego existente identificado por su ID.
// Utiliza { new: true } para devolver el documento modificado en lugar del original.
// Si el juego no existe, devuelve 404.
// Si la actualización es exitosa, devuelve el juego actualizado.
exports.updateJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!juego) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un juego
// Esta función elimina un juego de la base de datos por su ID.
// Si el juego no se encuentra, devuelve 404.
// Si se elimina correctamente, devuelve un mensaje de confirmación.
exports.deleteJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).json({ message: 'Juego no encontrado' });
    res.json({ message: 'Juego eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar juegos por título
// Esta función busca juegos cuyo título coincida parcialmente con la consulta (case-insensitive).
// Utiliza una expresión regular para la búsqueda flexible.
exports.searchJuegos = async (req, res) => {
  try {
    const { query } = req.query;
    // Búsqueda insensible a mayúsculas/minúsculas
    const juegos = await Juego.find({ titulo: { $regex: query, $options: 'i' } });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};