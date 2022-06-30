const path = require('path');

const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const mainController = {
    home : (req, res)=>{
        res.render('home')
    },
    
    producto: (req, res)=>{

        let idProducto = req.params.id;
		let product;
		for (let i=0; i<products.length; i++) {
            if (products[i].id == idProducto) {
				product = products[i];
			}
		}
        res.render('./products/producto',{product})
    }, 

    login: (req, res)=>{
        res.render('./users/login')
    },

    register: (req, res)=>{
        res.render('./users/register')
    }, 

    carrito: (req, res)=>{
        res.render('carrito')
    },
    cargar: (req, res)=>{
        res.render('cargar_productos')
    },
    listaProductos: (req, res)=>{
        res.render('./products/lista_productos')
    },

    editar: (req,res)=>{
        res.render('editar_productos')
    }
}; 

module.exports = mainController;