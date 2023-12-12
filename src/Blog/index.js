const express = require('express');

//Se requiere de router para crear todas las rutas del API.
const router = express.Router();

const { BlogController } = require("../Blog/controller");

//Se crea la aplicacion que se conecta a la base de datos de blog y realiza las trasacciones.
module.exports.BlogAPI = (app) => {
    router
        .get("/", BlogController.getArticles)
        .get("/:id", BlogController.getArticle)
        .post("/", BlogController.createArticle)
        .post("/update/:id", BlogController.updateArticle)
        .post("/delete/:id", BlogController.deleteArticle);

    app.use("/api/blog", router);
};