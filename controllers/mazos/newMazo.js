//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

//^ npm import
const { format } = require("date-fns");
const verEmail = require("@sendgrid/mail");
const crypto = require("crypto");

//^ Importamos el fichero .env
require("dotenv").config();

const newMazo = async (req, res, next) => {
	console.log("NewMazo");
	let connection;
	try {
		//* Conexion al DB
		connection = await getDB();
		//* Recuperamos parametros
		let { userToken, id } = req.tokenInfo;
		let { NameMazo, Lista } = req.body;

		const result = await connection.query(
			`INSERT INTO mazos (
				NameMazo,
				User
				) VALUES  (?,?)
				`,
			[NameMazo, id]
		);

		let resultInsertCards;
		Lista.forEach(async (element) => {
			const query = `INSERT INTO cartas (IDcarta, IDmazo, Name, ImageURL) VALUES (?,?,?,?)`;
			console.log("query", query);
			resultInsertCards = await connection.query(query, [
				element.id,
				result[0].insertId,
				element.name,
				element.imageUrl,
			]);
		});

		res.send({
			status: "ok",
			message: "Mazo Creado",
			questionID: result[0].insertId,
		});
	} catch (error) {
		console.log("error", error);
	}
	//* finaliza la conexion
	if (connection) connection.release();
};
module.exports = newMazo;
