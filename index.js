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

const isUser = require("./midlewares/isUser");

const newMazo = require("./controllers/mazos/newMazo");
const getMazos = require("./controllers/mazos/getMazos");
const deleteMazo = require("./controllers/mazos/deleteMazo");

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

//* POST - /mazos** - crea un mazo | Token obligatorio
app.post("/mazos", isUser, newMazo);
app.get("/getmazos/:idMazo", isUser, getMazos);
app.delete("/deletemazo/:idMazo", isUser, deleteMazo);
app.get("/getmazos/", isUser, getMazos);

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
