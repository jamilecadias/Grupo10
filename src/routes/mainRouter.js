const express = require ('express');
const router = express.Router();  
const mainController = require('../controllers/mainController'); 
const path = require('path');

// Acceso al home
router.get('/', mainController.home);

// Acceso al carrito
router.get('/iconoCarrito', mainController.carrito);

module.exports = router; 