//^ Importamos funcion que conecta a la BD
const getDB = require("../../db/db");

//^ npm import
const { format } = require("date-fns");
const verEmail = require("@sendgrid/mail");
const crypto = require("crypto");

//^ Importamos el fichero .env
require("dotenv").config();

// sendgrid
verEmail.setApiKey(process.env.SENDGRID_API_KEY);

// Crea el usuario
const newUser = async (req, res, next) => {
	//crear el usuario en la base de datos
	let connection;

	//* formatea la fecha para la BD
	const creationDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

	try {
		// Conexion a la base de datos
		connection = await getDB();
		//recuperamos parametros
		let { email, password, username } = req.body;

		//~ Consulta SQL - Consultar DB para ver si el usuario existe
		const [users] = await connection.query(
			`SELECT * FROM users
		WHERE Email = ?;
		`,
			[email]
		);

		//! si existe, da error
		if (users.length !== 0) {
			await generateErrors("Este email ya esta en uso", 409);
		}

		//* si no existe, crea el usuario en la DB inactivo y el codigo unico
		const RegistrationCode = crypto.randomBytes(25).toString("hex");

		await connection.query(
			`
			INSERT INTO users (
			  Email,
			  Password,
			  Username,
			  RegistationCode
			) VALUES (?, SHA2(?, 512),?,?)
			`,
			[email, password, username, RegistrationCode]
		);
	} catch (error) {
		console.log(error);
		next(error);
	}
	res.status(201).send({
		status: "ok",
		message: "Usuario creado",
		data: 1,
	});
};

module.exports = newUser;
