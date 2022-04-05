# Cocheras Backend :car:

## 📋Tabla de contenidos

* Descripción
* Instalación
* Uso y documentación
* Tecnologías
* Autor

## :scroll:Descripción

Cocheras backend, es un backend creado para una app cliente llamada "Park now", 
que permite buscar cocheras/estacionamientos cercanos a un punto de referencia enviado por un usuario.
La app se encuentra desplegada en el siguiente dominio

:link:https://parking-now.herokuapp.com/

Servicios brindados:

Como usuario:

* Registro y autenticación con tokens de acceso
* CRUD con vehículos solo apto para el usuario que lo creó
* CRUD con cocheras solo apto para el usuario que la creó
* Consulta sobre cocheras/estacionamientos cercanos

Como administrador

* Registro y autenticación con tokens de acceso
* Consulta sobre cocheras/estacionamientos cercanos
* Ver todos los vehículos/usuarios activos o inactivos


## :arrow_double_down:Instalación

Clonar el proyecto e instalar dependencias

```sh
  git clone https://github.com/cesarpo777/cocheras_backend.git
```

```sh
  npm install
```

## 📁Uso y documentación

Crea un archivo .env  usando como ejemplo el .env.example

```sh
PORT= Puerto donde va a correr la app
PRIVATE_KEY= Clave para firmar los tokens
DB_CNN: String de conexión a tu base de datos
GEOCODER_PROVIDER= Proveedor de geolocalización
GEOCODER_API_KEY= Clave de acceso a tu proveedor de geolocalización

```
Para ver documentación y probar endpoints importar los archivos de la carpeta postman en software de postman

## 🌟Tecnologías

* Express
* Express validator
* bcrypt
* jsonwebtoken
* mongoose
* mongodb
* cors
* dotenv
* node-geocoder

El proyecto actualmente esta alojado en:

:link:https://cocheras-backend.herokuapp.com/

---

## 📝Autor

César Muzio

Donde encontrarme:

| Github | LinkedIn |
| ----- |-------|
| [Github](https://github.com/cesarpo777)  | [LinkedIn](https://www.linkedin.com/in/c%C3%A9sar-muzio/)|
