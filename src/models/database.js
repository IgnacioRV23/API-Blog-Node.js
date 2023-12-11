const { MongoClient } = require("mongodb");

//Se importa libreria dotenv para variables de entorno.
require('dotenv').config();

//Se obtiene la variable de entorno que contiene el uri de mongoDb_atlas.
const DB_URI = `${process.env.DB_URI}`;

//Almacena la conexion a la base de datos.
var connection = null;

//Se crea la funcion para la conexion a la base de datos.
//El codigo debe de ser asincrono y siempre debe de contener una promesa para evitar error de cliente.
const connect = async (collectionDB) => new Promise(async (resolve, reject) => {
    try {
        //Si no existe una conexion, ingresa a crear una nueva y si no, reutiliza la conexion existente.
        if (!connection) {
            //Se crea el cliente mongodb
            const client = new MongoClient(DB_URI);

            //Se realiza la conexion del cliente.
            connection = await client.connect();
        }
        //Se conecta a la base de datos.
        const database = connection.db(process.env.DB_NAME);

        //Se obtiene la colleccion(Tabla), en base al parametro de coleccion.
        const collection = database.collection(collectionDB);

        //Se realiza el resolve, que es el equivalente a realizar el return.
        //Esto retorna la collecion o tabla de la base de datos, para que en el servicio se realice las trasacciones necesarias.
        resolve(collection);
    }
    catch (error) {
        //Se capturan los errores por consola y reject.
        reject(error);
        console.log(`src/models/database/Error: ${error}`);
    }
});

module.exports.Database = { connect };