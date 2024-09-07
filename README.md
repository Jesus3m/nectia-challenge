# Nectia - Gestión de Tareas y Usuarios

Esta API proporciona endpoints para la gestión de tareas (CRUD) y autenticación de usuarios, basada en JSON Web Tokens (JWT). La arquitectura utilizada es hexagonal, estructurada en capas: Router, Controlador, Servicio, Entidad, Repositorio, DataAccess y Adapter.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación](#documentación)
- [Autenticación](#autenticación)
- [Tecnologías](#tecnologías)

## Requisitos

- Node.js >= v18
- MongoDB
- npm o yarn

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-repo/api-crud-tasks.git
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    PORT=3000
    JWT_SECRET=tu_secreto_jwt
    JWT_EXPIRES_IN=1d
    DATABASE_URL=mongodb://localhost:27017/tu_bd
    ```

4. Inicia la aplicación:
    - Desarrollo
    ```bash
    npm run dev
    ```
    - Producción
    ```bash
    npm run build
    ```
    ```bash
    npm run start
    ```

## Estructura del Proyecto

```plaintext
src/
│
├── adapters/         # Comunicación externa (e.g., APIs, herramientas externas)
├── controllers/      # Lógica de entrada y salida de la API (manejo de peticiones y respuestas)
├── dataAccess/       # Conexión y acceso a la base de datos
├── entities/         # Definición de entidades del dominio (e.g., Usuario, Tarea)
├── repositories/     # Lógica de almacenamiento y recuperación de datos
├── routers/          # Definición de rutas y asignación de controladores
├── services/         # Lógica de negocio (orquestación de acciones entre capas)
└── index.ts          # Punto de entrada de la aplicación
```
## Documentación