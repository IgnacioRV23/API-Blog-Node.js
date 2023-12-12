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
            GetAll: {
                'Metodo': 'Get',
                'Ruta': `http://${req.headers.host}/api/blog/`,
                'Descripcion': 'Obtiene todos los elementos de la base de datos.'
            },

            GetById: {
                'Metodo': 'Get',
                'Ruta': `http://${req.headers.host}/api/blog/:id`,
                'Descripcion': 'Obtiene un elemento de la base de datos, se debe de especificar el id en la ruta de la peticion.'
            },

            Create: {
                'Metodo': 'Post',
                'Ruta': `http://${req.headers.host}/api/blog/`,
                'Descripcion': 'Realiza la creacion de un nuevo elemento en la base de datos, se debe de enviar un json con el nuevo registro por medio del body de la peticion.'
            },

            Update: {
                'Metodo': 'Post',
                'Ruta': `http://${req.headers.host}/api/blog/update/:id`,
                'Descripcion': 'Realiza la actualizacion de un elemento existente en la base de datos, se debe de enviar un json con la informacion actualizada del registro por medio del body de la peticion y su respectivo id por medio de la URL'
            },

            Delete: {
                'Metodo': 'Post',
                'Ruta': `http://${req.headers.host}/api/blog/delete/:id`,
                'Descripcion': 'Realiza la eliminacion de un elemento existente en la base de datos, se debe de enviar el id especifico del elemento que se desea eliminar, por medio de la URL de la peticion.'
            },
        };
        res.status(200).json({ menu });
    });

    app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
    //Realiza la ruta con *, que indica que se enviara un 404 Not Found para cualquier ruta no encontrada en el API.
    //NOTA:El router debe de estar anidado en la funcion para evitar conflicto.
    const router = express.Router();

    router.all("*", (req, res) => {
        res.status(404).json({ message: "Not Found" });
    });

    app.use("/", router);
};