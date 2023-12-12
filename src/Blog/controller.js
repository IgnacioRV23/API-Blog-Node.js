const { BlogService } = require("../Blog/service");

//Las funciones se colocan en forma de array envuelto en BlogController, para poder ser llamado en el router del index.
//si no se utiliza esta metodologia el programada da error.
module.exports.BlogController = {
    //Funcion para obtener todos los registros de la base de datos.
    getArticles: async (req, res) => {
        try {
            //Se debe de llamar a la funcion del servicio de manera asincrona.
            let articles = await BlogService.getAll();

            //Se realiza el response de la peticion.
            res.status(200).json({
                message: "Lista de articulos",
                body: articles
            });
        } catch (error) {
            //Captura los errores y envia un response 500.
            res.status(500).json({ message: "Internal Server Error" });
            console.log(`scr/Blog/controller/Error: ${error}`);
        }
    },

    //Obtiene uno de los articulos especificado por medio de su objectID.
    getArticle: async (req, res) => {
        try {
            //Obtiene el ID enviado por medio de la URL por medio de la propiedad params.
            let { params: { id } } = req;

            //Se llama a la funcion del servicio que obtiene el articulo.
            let article = await BlogService.getById(id);

            //Se realiza el response de la peticion.
            res.status(200).json({
                message: "Articulo encontrado",
                body: article
            });
        } catch (error) {
            //Captura los errores y envia un response 500.
            res.status(500).json({ message: "Internal Server Error" });
            console.log(`scr/Blog/controller/Error: ${error}`);
        }
    },

    //Obtiene uno de los articulos especificado por medio de su objectID.
    createArticle: async (req, res) => {
        try {
            //Obtiene el nuevo articulo por medio del body de la solicitud.
            let { body: newArticle } = req;

            //Se envia el nuevo articulo como parametro de la funcion para realizar la creacion en el servicio.
            await BlogService.create(newArticle);

            //Se envia una respuesta, con un status 201, que significa que se realizo un insert.
            res.status(201).json({ message: "Articulo creado" });
        } catch (error) {
            //Captura los errores y envia un response 500.
            res.status(500).json({ message: "Internal Server Error" });
            console.log(`scr/Blog/controller/Error: ${error}`);
        }
    },

    //Obtiene uno de los articulos especificado por medio de su objectID y realiza una actualizacion de su informacion.
    updateArticle: async (req, res) => {
        try {
            //Obtiene el ID enviado por medio de la URL por medio de la propiedad params.
            let { params: { id } } = req;

            //Obtiene la nueva informacion del articulo que se desea actualizar por medio del body de la solicitud.
            let { body: dataArticle } = req;

            //Se utiliza la funcion encargada de actualizar el registro.
            //Se envia su objectID y la informacion actualizada.
            await BlogService.updateById(id, dataArticle);

            res.status(200).json({ message: "Articulo actualizado" });
        } catch (error) {
            //Captura los errores y envia un response 500.
            res.status(500).json({ message: "Internal Server Error" });
            console.log(`scr/Blog/controller/Error: ${error}`);
        }
    },

    deleteArticle: async (req, res) => {
        try {
            //Obtiene el ID enviado por medio de la URL por medio de la propiedad params.
            let { params: { id } } = req;

            //Se realiza el llamado del servicio que se encarga de eliminar el registro en base al id enviado como parametro.
            await BlogService.deleteByID(id);

            res.status(200).json({ message: "Articulo eliminado" });
        } catch (error) {
            //Captura los errores y envia un response 500.
            res.status(500).json({ message: "Internal Server Error" });
            console.log(`scr/Blog/controller/Error: ${error}`);
        }
    }
}