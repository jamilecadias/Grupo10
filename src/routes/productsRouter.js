const express = require ('express');
const router = express.Router();  
const productsController = require('../controllers/productsController'); 
const path = require('path');
const multer = require('multer'); 

// Middlewares
const productsValidation = require('../../middlewares/productsValidationMiddleware');

// Multer products
const storageProducts = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '/../../public/images'))
        
    },
    filename:(req, file, cb)=>{
        let productName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, productName); 
    }

})
const uploadProduct = multer({ storage : storageProducts });

// Acceso a lista de productos
router.get('/', productsController.products);

// Acceso al detalle del producto
router.get('/detail/:id', productsController.detail);

// Formulario de creación
router.get('/create', productsController.create); // Acceso vista
router.post('/', uploadProduct.single('image'), productsValidation,  productsController.store); // Procesamiento

// Formulario de edición
router.get('/edit/:id', productsController.edit); // Acceso vista
router.put('/edit/:id',productsValidation,  productsController.update);  //Envío  uploadProduct.single('image'),
router.delete('/:id', productsController.destroy); // Eliminar

//Formulario de Búsqueda

router.post("/search",productsController.search)

module.exports = router; 