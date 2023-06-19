//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

//^ npm import
const { format } = require("date-fns");
const verEmail = require("@sendgrid/mail");
const crypto = require("crypto");

//^ Importamos el fichero .env
require("dotenv").config();

const deleteMazo = async (req, res, next) => {
	console.log("getMazos");
	let connection;
	try {
		//* Conexion al DB
		connection = await getDB();
		//* Recuperamos parametros
		const { idMazo } = req.params;
		let { id } = req.tokenInfo;
		console.log("req.tokenInfo", req.tokenInfo);

		const result = await connection.query(
			`DELETE FROM mazos WHERE ID = ? AND User = ?
					`,
			[idMazo, id]
		);

		const result2 = await connection.query(
			`DELETE FROM cartas WHERE IDmazo = ? 
					`,
			[idMazo]
		);
		res.send({
			status: "ok",
			message: "Mazo Borrado",
		});
	} catch (error) {
		console.log("error", error);
	}
	//* finaliza la conexion
	if (connection) connection.release();
};
module.exports = deleteMazo;
