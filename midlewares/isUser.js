"use strict";

//^npm import
const jwt = require("jsonwebtoken");

//^ Importamos funcion que conecta a la BD
const getDB = require("../db/db");

//^ Importa funcion que genera errores
const { generateErrors } = require("../helpers");

//& Comprueba token
const isUser = async (req, res, next) => {
	let connection;

	console.log("llegoo is user");
	console.log("req", req);

	try {
		//* Conecta a la DB
		connection = await getDB();

		console.log("connection", connection);

		//* recoje parametros
		const { authorization } = req.headers;

		//! si no tengo Authorization salgo con un error
		if (!authorization) {
			await generateErrors("Por favor inicie sesion", 401);
		}

		//* verifica token
		let tokenInfo;

		tokenInfo = jwt.verify(authorization, process.env.JWT_SECRET);

		//* añadimos en la request (req) el tokenInfo
		req.tokenInfo = tokenInfo;
		console.log("tokenInfo", tokenInfo);
		console.log("termino isuser");
		next();
	} catch (error) {
		console.log("Error", error);
		next(error);
	} finally {
		//* finaliza la conexion
		if (connection) connection.release();
	}
};

module.exports = isUser;
