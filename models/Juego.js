const mongoose = require('mongoose');

// Definición del esquema para la colección 'Juegos'
const JuegoSchema = new mongoose.Schema({
  // Título del juego
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'], // Validación: campo requerido
    trim: true, // Elimina espacios en blanco al inicio y final
    unique: true // Validación: debe ser único en la base de datos
  },
  // Género del juego (ej: Acción, RPG)
  genero: {
    type: String,
    required: [true, 'El género es obligatorio']
  },
  // Plataforma donde se juega (ej: PC, PS5)
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria']
  },
  // Año en que se lanzó el juego
  añoLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: 1950, // Validación: año mínimo
    max: new Date().getFullYear() + 5 // Validación: año máximo (actual + 5 años)
  },
  // Empresa o persona desarrolladora
  desarrollador: {
    type: String,
    required: [true, 'El desarrollador es obligatorio']
  },
  // URL de la imagen de portada
  imagenPortada: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Sin+Portada' // Valor por defecto si no se provee
  },
  // Descripción o sinopsis del juego
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  // Indica si el juego está marcado como favorito
  favorito: {
    type: Boolean,
    default: false
  },
  // Estado de progreso del juego
  estado: {
    type: String,
    enum: ['no empezado', 'en progreso', 'completado'], // Valores permitidos
    default: 'no empezado'
  },
  // Contador de horas jugadas
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  },
  // Indica si el juego está en la biblioteca del usuario
  enBiblioteca: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Añade automáticamente campos createdAt y updatedAt
});

// Exportar el modelo 'Juego' basado en el esquema
module.exports = mongoose.model('Juego', JuegoSchema);
