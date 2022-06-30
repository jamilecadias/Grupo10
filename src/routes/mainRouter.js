const express = require ('express');
const router = express.Router();  

const mainController = require('../controllers/mainController'); 

router.get('/', mainController.home);

router.get('/login', mainController.login);

router.get('/register', mainController.register);

router.get('/products', mainController.listaProductos);

router.get('/products/create', mainController.cargar);

router.post('/products', mainController.store);

router.get('/products/:id/edit', mainController.edit)


router.get('/products/:id', mainController.producto);

router.get('/iconoCarrito', mainController.carrito);





router.get('/editar_productos' , mainController.edit);
module.exports = router; 