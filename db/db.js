const mySql = require("mysql2/promise");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
console.log("MYSQL_USER", MYSQL_USER);

let pool;

async function getDB() {
	console.log("user", MYSQL_USER);
	if (!pool) {
		pool = mySql.createPool({
			connectionLimit: 10,
			host: MYSQL_HOST,
			user: MYSQL_USER,
			password: MYSQL_PASSWORD,
			database: MYSQL_DATABASE,
			timezone: "Z",
		});
	}
	return await pool.getConnection();
}

module.exports = getDB;
