const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para la colección 'Resenas'
const ResenaSchema = new Schema({
  // Referencia al ID del juego al que pertenece la reseña
  juegoId: {
    type: Schema.Types.ObjectId,
    ref: 'Juego', // Relación con el modelo 'Juego'
    required: true
  },
  // Puntuación dada al juego (1 a 5 estrellas)
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  // Contenido textual de la reseña
  textoReseña: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio']
  },
  // Nombre del usuario que escribe la reseña
  usuario: {
    type: String,
    required: [true, 'El nombre del usuario es obligatorio'],
    default: 'Anónimo'
  },
  // Horas jugadas al momento de la reseña
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  },
  // Percepción de la dificultad del juego
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'], // Valores permitidos
    default: 'Normal'
  },
  // Si el usuario recomendaría el juego
  recomendaria: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Añade automáticamente campos createdAt y updatedAt
});

// Exportar el modelo 'Resena' basado en el esquema
module.exports = mongoose.model('Resena', ResenaSchema);