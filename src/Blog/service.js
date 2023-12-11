const {Database} = require("../models/database");

const {ObjectId} = require("mongodb");

const collectionDB = "Noticias";

//Funcion que obtiene todos los articulos del blog, realiza un getAll a la base de datos.
const getAll = async () => {
    //Solicita la colleccion a la base de datos.
    const collection = await Database.connect(collectionDB);

    //Realiza la busqueda de todo lo existen en la colleccion y lo retorna.
    let result = await collection.find({}).toArray();

    return result;
};

//Se realiza la exportacion de las funciones.
module.exports.BlogService = {
    getAll
};