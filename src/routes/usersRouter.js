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
    body('email').notEmpty().withMessage('Este campo debe estar completo.').bail()
    .isEmail().withMessage('Debe ser un email valido.'),
    //body('tel').isLength({ min: 8, max:12 }).withMessage('Debe tener entre 8 y 12 digitos.'),//
    body('password').notEmpty().withMessage('Dede ingresar una contraseña').bail()
    .isLength(({ min: 8 })).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('profileImage').custom((value , {req}) => {
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

// Middlewares
const guestMiddleware = require ('../../middlewares/guestMiddleware'); 
const authMiddleware = require ('../../middlewares/authMiddleware'); 

// Formulario de login
router.get('/login',guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin); 

// Registro
router.get('/register', guestMiddleware, usersController.register); // Acceso vista
router.post('/register' , uploadUser.single('profileImage') , validations, usersController.processUsersRegister) // Procesamiento

// Profile
router.get('/profile',authMiddleware, usersController.profile);
router.get('/edit/:id', usersController.edit);


//Logout
router.get('/logout/', usersController.logout); 

module.exports = router; 