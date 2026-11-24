
## Descripción del proyecto

**Nevados** es una aplicación móvil desarrollada para un emprendimiento familiar dedicado a la elaboración y comercialización de paletas artesanales. Su propósito es facilitar la consulta de sabores disponibles, la creación de pedidos personalizados y el seguimiento de los pedidos registrados.

El proyecto está desarrollado para dispositivos Android y cuenta con una arquitectura cliente-servidor, mediante una aplicación móvil que consume una API REST conectada a una base de datos MySQL.

## Objetivo

Desarrollar una aplicación móvil que permita a los clientes conocer los productos de Nevados, realizar pedidos de paletas artesanales y consultar el estado de sus pedidos de manera sencilla.

## Funcionalidades principales

- **Inicio:** presentación de la aplicación y acceso a sus diferentes secciones.
- **Quiénes somos:** información sobre el emprendimiento Nevados.
- **Catálogo:** consulta de los sabores disponibles.
- **Pedidos personalizados:** selección de sabores y cantidades.
- **Registro de pedidos:** almacenamiento de los pedidos realizados.
- **Consulta de pedidos:** búsqueda de pedidos mediante su código de identificación.
- **Contacto:** acceso a los canales de comunicación del emprendimiento, incluido WhatsApp.

## Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Aplicación móvil | React Native |
| Entorno de desarrollo | Expo |
| Lenguaje de programación | JavaScript / TypeScript |
| Backend | Node.js |
| Framework del servidor | Express |
| Base de datos | MySQL |
| Conexión a base de datos | mysql2 |
| Alojamiento de API | Render |
| Alojamiento de base de datos | Aiven |

## Arquitectura del sistema

El proyecto utiliza una arquitectura cliente-servidor:

1. **Aplicación móvil:** interfaz desde la que el usuario consulta los sabores y registra o consulta pedidos.
2. **API REST:** recibe las solicitudes de la aplicación, procesa la información y establece la comunicación con la base de datos.
3. **Base de datos MySQL:** almacena la información de los sabores, pedidos y productos asociados a cada pedido.


## API REST

La API se encuentra desplegada en Render:

**URL:** https://nevados-api.onrender.com

### Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/sabores` | Consulta los sabores disponibles. |
| POST | `/api/v1/pedidos` | Registra un nuevo pedido. |
| GET | `/api/v1/pedidos/:id` | Consulta un pedido mediante su identificador. |

## Instalación y ejecución

### Aplicación móvil

1. Instalar Node.js y las herramientas necesarias para trabajar con Expo.
2. Clonar este repositorio.
3. Ingresar a la carpeta de la aplicación móvil.
4. Instalar las dependencias con `npm install`.
5. Ejecutar el proyecto con `npx expo start`.

### API

1. Ingresar a la carpeta `NevadosAPI`.
2. Instalar las dependencias con `npm install`.
3. Configurar las variables de entorno necesarias para la conexión a MySQL.
4. Ejecutar el servidor según la configuración del proyecto.



## Descarga de la aplicación

La versión Android de Nevados se encuentra disponible mediante el siguiente enlace:

[Descargar APK de Nevados](https://expo.dev/artifacts/eas/PBTF8eFQBxgBJKWLJsl45e_LStEdPVS-DK7E91XkiU4.apk)


