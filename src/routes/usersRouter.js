const express = require ('express');
const router = express.Router();  
const usersController = require('../controllers/usersController'); 
const path = require('path');
const multer = require('multer'); 

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

// Formulario de login
router.get('/login', usersController.login);

// Registro
router.get('/register', usersController.register); // Acceso vista
router.post('/register' , uploadUser.single('profile-image') ,usersController.processUsersRegister) // Procesamiento

module.exports = router; 