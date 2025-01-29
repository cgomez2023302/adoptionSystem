import { body } from "express-validator";
import { existeEmail } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username", "El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo valido").isEmail(),
    body("email").custom(existeEmail),
    /*body("password",).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers:1,
        minSymbols: 0
    }),*/
    validarCampos
]