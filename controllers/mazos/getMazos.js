//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

//^ npm import
const { format } = require("date-fns");
const verEmail = require("@sendgrid/mail");
const crypto = require("crypto");

//^ Importamos el fichero .env
require("dotenv").config();

const getMazos = async (req, res, next) => {
	console.log("getMazos");
	let connection;
	try {
		//* Conexion al DB
		connection = await getDB();
		//* Recuperamos parametros
		const { idMazo } = req.params;
		let { id } = req.tokenInfo;
		console.log("req.tokenInfo", req.tokenInfo);

		console.log("idMazo", idMazo);
		if (!idMazo) {
			const result = await connection.query(
				`SELECT * FROM mazos WHERE User = ?
				`,
				[id]
			);
			res.send({
				status: "ok",
				message: "Mazos Listado",
				mazos: result[0],
			});
		} else {
			const result = await connection.query(
				`SELECT * FROM cartas WHERE IDmazo = ?
					`,
				[idMazo]
			);
			res.send({
				status: "ok",
				message: "Mazo Listado",
				mazos: result[0],
			});
		}
	} catch (error) {
		console.log("error", error);
	}
	//* finaliza la conexion
	if (connection) connection.release();
};
module.exports = getMazos;
