const express = require('express');

module.exports.IndexAPI = (app) => {
    //Realiza la creacion de la ruta inicial del proyecto.
    //Al hacer una peticion de: host:puerto/
    //Ejemplo ruta: localhost:3000/
    //Retorna el menu de la aplicacion.
    //NOTA:El router debe de estar anidado en la funcion para evitar conflicto.
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            //products:`http://${req.headers.host}/api/blog/`
            products:`localhost:3000/api/blog/`
        };
        res.status(200).json({menu});
    });

    app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
    //Realiza la ruta con *, que indica que se enviara un 404 Not Found para cualquier ruta no encontrada en el API.
    //NOTA:El router debe de estar anidado en la funcion para evitar conflicto.
    const router = express.Router();
    
    router.all("*", (req, res) => {
        res.status(404).json({message:"Not Found"});
    });

    app.use("/", router);
};