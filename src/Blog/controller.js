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
    }
}