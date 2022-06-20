const express = require ('express');
const router = express.Router();  

const mainController = require('../controllers/mainController'); 

router.get('/', mainController.home);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

router.get('/producto', mainController.producto);

router.get('/iconoCarrito', mainController.carrito);

router.get('/cargar_productos', mainController.cargar);

router.get('/listaProductos', mainController.listaProductos);

router.get('/editar_productos' , mainController.editar);
module.exports = router; 