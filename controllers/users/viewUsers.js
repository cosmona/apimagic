//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

//^ Importamos funcion validate - genera errores y schema que comprueba los datos
/* const { generateErrors } = require("../../helpers"); */

//& GET - /users/** - mostrar usuario | Token y Solo el propio usuario (+ o - datos)
const viewUsers = async (req, res, next) => {
	let connection;
	let myId = 0;
	console.log("myId", myId);
	let result;

	try {
		//* Conexion al DB
		connection = await getDB();

		//* Recoger parametros
		const { id } = req.params;

		//* SI se ha pasado el ID de un usuario
		if (id !== undefined) {
			myId = req.userToken.id;

			//* si es el propio usuario enseña mas o menos datos
			if (id == myId) {
				//~ Consulta SQL de una pregunta por id
				result = await connection.query(
					`
        SELECT * FROM users
        WHERE id = ? AND Deleted = ?;
        `,
					[id, 0]
				);
			} else {
				//~ Consulta SQL de una pregunta por id
				result = await connection.query(
					`
        SELECT ID, Username, UserRole, Technology FROM users
        WHERE id = ? AND Deleted = ?;
        `,
					[id, 0]
				);
			}

			//! no existe el usuario
			if (result[0].length === 0) {
				await generateErrors("Usuario no encontrado", 409);
			}
		} else {
			//*no se ha pasado Id de usuario y enseña todos los usuarios
			//~ Consulta SQL de una pregunta por id
			result = await connection.query(
				`SELECT ID,email FROM users WHERE Deleted = 0;`
			);
		}

		//* Devolvemos resultado
		res.send({
			status: "ok",
			message: "Usuarios mostrados",
			data: {
				result: result[0],
			},
		});
	} catch (error) {
		next(error);
	} finally {
		//* Acaba la conexion
		if (connection) connection.release();
	}
};

module.exports = viewUsers;
