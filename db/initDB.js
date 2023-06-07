// script que se ocupará de crear las tablas y añadir datos
// node initDB.js

require("dotenv").config();
const getDB = require("./db");

let connection;

async function main() {
	try {
		connection = await getDB();
		// BORRAR TABLAS
		console.log("Borrando tablas....");
		await connection.query("DROP TABLE IF EXISTS users;");

		await connection.query(`
			CREATE TABLE users (
				ID INT PRIMARY KEY AUTO_INCREMENT,
				Email VARCHAR(100) UNIQUE NOT NULL,
				CreationDate DATETIME,
				Username VARCHAR(100) NOT NULL,
				Password VARCHAR(512) NOT NULL,	
				Activation BOOLEAN DEFAULT false,
				RegistationCode VARCHAR(50)
				)
				`);
	} catch (error) {
		console.error("ERROR", error.message);
	} finally {
		if (connection) connection.release();
	}
	process.exit();
}
main();
