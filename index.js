require("dotenv").config();
const cors = require("cors");

const express = require("express");
const PORT = process.env.PORT;
const {
	newUser,
	viewUsers,
	validateUsers,
	loginUsers,
} = require("./controllers/users/index");

const morgan = require("morgan");

const app = express();
app.use(cors());

//middleware para loguear peticiones http
app.use(morgan("dev"));

//middleware para pardear el JSON
app.use(express.json());

// ENDPOINTS

app.post("/users", newUser);
app.get("/users/", viewUsers);
app.get("/users/validate/:RegistationCode", validateUsers);
app.post("/users/login/", loginUsers);

// middleware 404 not found
app.use((req, res) => {
	res.status(404).send({
		status: "error",
		message: "Not found",
	});
});
// Express en escucha
console.log("PORT", PORT);
app.listen(PORT, () => {
	console.log(`Servidor activo en http://127.0.0.1:${PORT}`);
});
