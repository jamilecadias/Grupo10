const path = require('path');
const { body } = require('express-validator'); 

const validations = [
    body('name')
        .notEmpty()
        .withMessage('Este campo debe estar completo.')
        .bail()
        .isLength(({ min: 2 }))
        .withMessage('El debe tener al menos 8 caracteres.'),
    body('email')
        .notEmpty()
        .withMessage('Este campo debe estar completo.')
        .bail()
        .isEmail()
        .withMessage('Ingresar un email válido'),
    //body('tel').isLength({ min: 8, max:12 }).withMessage('Debe tener entre 8 y 12 digitos.'),//
    body('password')
        .notEmpty()
        .withMessage('Debe ingresar una contraseña')
        .bail()
        .isLength(({ min: 8 }))
        .withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('avatar').custom((value , {req}) => {
        let file = req.file; 
        let acceptedExtensions = ['.jpg' , '.gif' , '.png', '.jpeg'];
        if (!file){
            throw new Error ('Debe subir una imágen.')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}');
            } return true;
        }
    } 
    ) 
]

module.exports = validations ;