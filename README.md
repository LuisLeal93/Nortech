# Nortech

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Requisitos para replicar las pruebas:

* Seguir los pasos descritos en los archivos word correspondientes de cada proyecto, Ejemplo:

## EasyCredit

* Tener instalado MySQL

* Correr el archivo “MySQL EasyCredit LALS.sql”.
    precaucion: Se creara una BD llamada EasyCredit, 
    verifica que no tengas una BD con el mismo nombre para evitar perdida de datos.

* En MySQL: 
    Crear un usuario con nombre; ‘root’, clave: ‘123456’,
    Escuchar MySQL en el puerto 3306, o bien remplazar la información 
    del usuario en el archivo “\EasyCredit\config\conexion.js”

* Ir a la carpeta “EasyCredit”. Ejecutar “npm install”.
    si ocurre algún error: eliminar la carpeta “node_modules” e intentar de nuevo.
    Correr el servidor con “npm start”
    Si todos los datos están en orden obtendrás una respuesta en la URL: “localhost:3000/”

* Para probar el back-end, realizar peticiones en POSTMAN:
    Peticiones usadas:
    https://www.getpostman.com/collections/19ee7828cc8a8b405928
    requerido para actualizar la información de una petición de crédito:
    PUT: “localhost:3000/crédito/”,  Body: id, estado

* Ir a la carpeta “EasyCredit-Front”. Ejecutar “npm install”.
    si ocurre algún error: eliminar la carpeta “node_modules” e intentar de nuevo.
    Correr el servidor con “ng serve”

* Probar el programa.
    nota: 
    el programa puede fallar la primera vez que es ejecutado después de la instalación,
    al recargar la página seguirá su funcionamiento planeado.


## Nortech

* Para probar el back-end, realizar peticiones en POSTMAN:
    Peticiones usadas:
    https://www.getpostman.com/collections/5eae769c5f8ea52d0ba3

*	Front aun no disponible

