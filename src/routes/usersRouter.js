const express = require ('express');
const router = express.Router();  
const usersController = require('../controllers/usersController'); 

// Middlewares
const guestMiddleware = require ('../../middlewares/guestMiddleware'); 
const authMiddleware = require ('../../middlewares/authMiddleware'); 
const registerValidation = require('../../middlewares/registerValidationMiddleware');
const loginValidation = require('../../middlewares/loginValidationMiddleware')
const uploadUser = require('../../middlewares/multerUserMiddleware');

// Formulario de login
router.get('/login',guestMiddleware, usersController.login);
router.post('/login',loginValidation, usersController.processLogin); 

// Registro
router.get('/register', guestMiddleware, usersController.register); // Acceso vista
router.post('/register' , uploadUser.single('avatar') , registerValidation, usersController.processUsersRegister) // Procesamiento

// Profile
router.get('/profile',authMiddleware, usersController.profile);
router.get('/edit/:id', usersController.edit);
router.post('/edit/:id',uploadUser.single('avatar') ,  usersController.update)
router.delete('/delete/:id' , usersController.destroy)



//Logout
router.get('/logout/', usersController.logout); 



module.exports = router; 