const express = require ('express');
const router = express.Router();  
const mainController = require('../controllers/mainController'); 

// Acceso al home
router.get('/', mainController.home);

// Acceso a lista de productos

router.get('/products', mainController.listaProductos);

// Acceso al detalle del producto

router.get('/products/:id', mainController.producto);

// Formulario de creación
router.get('/products/create', mainController.cargar); // Acceso
router.post('/products', mainController.store); // Procesamiento

// Formulario de edición
router.get('/products/:id/edit', mainController.edit); // Acceso
router.put('/products/:id', mainController.update);  //Envío
router.delete('/products/:id', mainController.destroy); // Eliminar

// Formulario de login

router.get('/login', mainController.login);

// Registro
router.get('/register', mainController.register); // Acceso
router.post('/register' , mainController.processUsersRegister) // Procesamiento

// Acceso al carrito
router.get('/iconoCarrito', mainController.carrito);

//router.get('/editar_productos' , mainController.edit); // Creo que sobra

module.exports = router; 