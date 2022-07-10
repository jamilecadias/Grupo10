const express = require ('express');
const router = express.Router();  
const mainController = require('../controllers/mainController'); 
const path = require('path');

// Multer
const multer = require('multer'); 
const storageUsers = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images/usersImages'))
    },
    filename:(req, file, cb)=>{
        let userName = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, userName); 
    }

})
const uploadUser = multer({ storage : storageUsers });

// Acceso al home
router.get('/', mainController.home);

// Acceso a lista de productos

router.get('/products', mainController.listaProductos);

// Acceso al detalle del producto

router.get('/products/:id', mainController.producto);

// Formulario de creación
router.get('/products/create', mainController.cargar); // Acceso vista
router.post('/products', mainController.store); // Procesamiento

// Formulario de edición
router.get('/products/:id/edit', mainController.edit); // Acceso vista
router.put('/products/:id', mainController.update);  //Envío
router.delete('/products/:id', mainController.destroy); // Eliminar

// Formulario de login

router.get('/login', mainController.login);

// Registro
router.get('/register', mainController.register); // Acceso vista
router.post('/register' , uploadUser.single('profile-image') ,mainController.processUsersRegister) // Procesamiento

// Acceso al carrito
router.get('/iconoCarrito', mainController.carrito);

//router.get('/editar_productos' , mainController.edit); // Creo que sobra

module.exports = router; 