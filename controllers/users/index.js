const newUser = require("./newUser"); //& Crea usuario
const viewUsers = require("./viewUsers.js");
const validateUsers = require("./validateUsers"); //& Valida usuario
const loginUsers = require("./loginUsers"); //& Login usuario
/* const userEdit= require("./userEdit");				//& Edita un usuario */
/* const userDelete= require("./userDelete")				//& Borra un usuario */
module.exports = {
	newUser,
	viewUsers,
	validateUsers,
	loginUsers,
};
