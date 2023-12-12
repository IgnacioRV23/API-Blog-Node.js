const {Database} = require("../models/database");

const {ObjectId} = require("mongodb");

const collectionDB = "Noticias";

//Funcion que obtiene todos los articulos del blog, realiza un getAll a la base de datos.
const getAll = async () => {
    //Solicita la coleccion a la base de datos.
    const collection = await Database.connect(collectionDB);

    //Realiza la busqueda de todo lo existen en la coleccion y lo retorna.
    let result = await collection.find({}).toArray();

    return result;
};

//Obtiene uno de los elementos especificados por su objectID.
const getById = async (id) => {
    //Solicita la coleccion a la base de datos.
    const collection = await Database.connect(collectionDB);

    //Se crea una nueva instancia del objectID
    let object = new ObjectId(id);
    
    //Realiza el filtro de la coleccion por medio del id enviado como parametro.
    let result = await collection.findOne({_id:object});

    return result;
};

//Servicio que realiza el insert de un nuevo articulo a la coleccion.
const create = async (newArticle) => {
    //Solicita la coleccion a la base de datos.
    const collection = await Database.connect(collectionDB);

    //Se envia como parametro el nuevo articulo que ya se encuentra formateado.
    await collection.insertOne(newArticle);
};

//Se realiza la exportacion de las funciones.
module.exports.BlogService = {
    getAll,
    getById,
    create
};