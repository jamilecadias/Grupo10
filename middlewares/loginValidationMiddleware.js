const path = require('path');
const { body } = require('express-validator'); 

const validations = [
    
    body('email')
        .notEmpty()
        .withMessage('Este campo debe estar completo.')
        .bail()
        .isEmail()
        .withMessage('Ingresar un email válido'),
    
    body('password')
        .notEmpty()
        .withMessage('Debe ingresar una contraseña')
        .bail()
        .isLength(({ min: 8 }))
        .withMessage('La contraseña debe tener al menos 8 caracteres.'),
    
    
]

module.exports = validations ;