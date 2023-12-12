require('dotenv').config();

const express = require('express');

const { IndexAPI, NotFoundAPI } = require("./src/Routes");

const { BlogAPI } = require("./src/Blog/index");

const app = express();

const port = process.env.PORT || 3000;

//Configuraciones
app.use(express.json());

app.set("port", port);

//Rutas
IndexAPI(app);
BlogAPI(app);
NotFoundAPI(app);

//Servidor.
app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en el puerto: ${app.get("port")}`);
});