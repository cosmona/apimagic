"use strict";

//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

const { generateErrors } = require("../../helpers");

//& Valida Usuario
const validateUsers = async (req, res, next) => {
	let connection;

	try {
		//* Conexion al DB
		connection = await getDB();

		//* Recogemos parametros
		const { RegistationCode } = req.params;
		console.log("req.params", req.params);

		//~ Consulta SQL - comprobamos si existe un usuario con este registrationCode
		const [user] = await connection.query(
			`
        SELECT ID
        FROM users
        WHERE RegistationCode = ?
        `,
			[RegistationCode]
		);
		console.log("usedr", user);

		//!si no existe el codigo de validacion
		if (user.length === 0) {
			await generateErrors(
				"Ningun usuario encontrado con este código de validación",
				404
			);
		}

		//* activamos el usuario y borramos RegistrationCode
		await connection.query(
			`
          UPDATE users
          SET Activation=true, RegistationCode=NULL
          WHERE RegistationCode=?
      `,
			[RegistationCode]
		);

		//* Devolvemos resultados
		res.send({
			status: "ok",
			message: "Usuario validado",
		});
	} catch (error) {
		next(error);
	} finally {
		//* Acabamos la conexion
		if (connection) connection.release();
	}
};

module.exports = validateUsers;
