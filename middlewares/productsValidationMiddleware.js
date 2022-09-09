const path = require('path');
const { body } = require('express-validator'); 

const productsValidation = [
    body('name')
    .notEmpty()
    .withMessage('Este campo debe estar completo')
    .bail()
    .isLength({ min : 5})
    .withMessage('Este campo debe tener al menos 5 caracteres'),

    body('price')
    .notEmpty()
    .withMessage('Este campo debe estar completo')
    .bail()
    .isInt()
    .withMessage('Debe ingresar un número'),

    body('description')
    .notEmpty()
    .withMessage('Este campo debe estar completo')
    .bail()
    .isLength({ min : 20})
    .withMessage('Este campo debe tener al menos 20 caracteres'),
    
    // body('image').custom((value , {req}) => {
    //     let file = req.file; 
    //     let acceptedExtensions = ['.jpg' , '.gif' , '.png', '.jpeg'];
    //     if (!file){
    //         throw new Error ('Debe subir una imágen.')
    //     } else {
    //         let fileExtension = path.extname(file.originalname);
    //         if (!acceptedExtensions.includes(fileExtension)) {
    //             throw new Error ('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}');
    //         } return true;
    //     }
    // } 
    // ) 
]

module.exports = productsValidation