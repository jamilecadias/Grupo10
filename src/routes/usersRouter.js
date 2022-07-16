const express = require ('express');
const router = express.Router();  
const usersController = require('../controllers/usersController'); 
const path = require('path');
const multer = require('multer'); 
const { body } = require('express-validator'); 

// Multer users
const storageUsers = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '/../../public/images/usersImages'))
        
    },
    filename:(req, file, cb)=>{
        let userName = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, userName); 
    }

})
const uploadUser = multer({ storage : storageUsers });

const validations = [
    body('name').notEmpty().withMessage('Este campo debe estar completo.'),
    body('email').isEmail().withMessage('Debe ser un email valido.'),
    body('tel').isLength({ min: 8, max:12 }).withMessage('Debe tener entre 8 y 12 digitos.'),
    body('password').isLength(({ min: 8 })).withMessage('La contraseña debe tener al menos 8 caracteres.') 
]

// Formulario de login
router.get('/login', usersController.login);

// Registro
router.get('/register', usersController.register); // Acceso vista
router.post('/register' , uploadUser.single('profile-image') , validations, usersController.processUsersRegister) // Procesamiento

module.exports = router; 