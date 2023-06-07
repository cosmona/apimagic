"use strict";

//& Validar usuario
async function validate(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 400;
    throw error;
  }
}

//& Función de errores
async function generateErrors(message, code) {
  console.log("llego aquí con un error" + message);
  const error = new Error(message);
  error.httpStatus = code;
  throw error;
}

module.exports = { validate, generateErrors };
