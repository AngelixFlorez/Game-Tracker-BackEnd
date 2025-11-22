# Game Tracker Backend

## Descripción
Este proyecto es el backend para la aplicación **Game Tracker**, una plataforma diseñada para gestionar una biblioteca de videojuegos y reseñas. Proporciona una API RESTful construida con Node.js y Express que interactúa con una base de datos MongoDB.

## Funcionalidades Principales
- **Gestión de Juegos**: Crear, leer, actualizar y eliminar (CRUD) información sobre videojuegos.
- **Sistema de Reseñas**: Permitir a los usuarios añadir, ver y eliminar reseñas de los juegos.
- **API RESTful**: Endpoints bien definidos para la interacción con el frontend.

## Tecnologías Usadas
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para construir la API.
- **MongoDB**: Base de datos NoSQL para almacenar juegos y reseñas.
- **Mongoose**: ODM (Object Data Modeling) para modelar los datos de MongoDB.
- **Cors**: Middleware para permitir peticiones desde el frontend (Cross-Origin Resource Sharing).
- **Dotenv**: Carga de variables de entorno desde un archivo `.env`.
- **Nodemon**: Herramienta de desarrollo para reiniciar el servidor automáticamente ante cambios.

## Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/AngelixFlorez/Game-Tracker-BackEnd.git
    cd Game-Tracker-BackEnd
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
    ```env
    PORT=3000
    MONGO_URI=tu_cadena_de_conexion_a_mongodb
    ```

4.  **Iniciar el servidor:**
    - Modo desarrollo (con Nodemon):
      ```bash
      npm run dev
      ```
    - Modo producción:
      ```bash
      npm start
      ```

## Estructura del Proyecto
- `controllers/`: Lógica de negocio para manejar las peticiones.
- `models/`: Definición de los esquemas de datos (Mongoose).
- `routes/`: Definición de las rutas de la API.
- `server.js`: Punto de entrada de la aplicación.
