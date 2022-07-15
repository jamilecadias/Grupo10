const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    
    detail: (req, res)=>{
        let idProducto = req.params.id;
		let product;
		for (let i=0; i<products.length; i++) {
            if (products[i].id == idProducto) {
				product = products[i];
			}
		}
        res.render('./products/producto',{product})
    }, 

    store: (req, res) => {
		let product = req.body;
		product.id = (products.length + 1);
		products.push(product);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		res.redirect('/products')
	},

    create: (req, res)=>{
        res.render('cargar_productos')
    },

    products: (req, res)=>{
        res.render('./products/lista_productos',{products} )
    },

    edit: (req,res)=>{
        let id = req.params.id;
        globalThis.productToEdit = null;
		for (let i=0; i<products.length; i++) {
			if (products[i].id == id) {
				productToEdit = products[i];
			}
		}
		res.render('editar_productos', { productToEdit })
    }, 

    update: (req, res) => {
		let id = productToEdit.id;
		for (let i=0; i<products.length; i++) {
			if (products[i].id == id) {
				products[i].name = req.body.name;
				products[i].price = req.body.price;
				products[i].description = req.body.description;
                /*products[i].features = req.body.features;*/
                products[i].image = req.body.image;
			}
		};
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		res.redirect('/products'); 
	},

    destroy: (req, res) => {
		let id = req.params.id;
		console.log(id);
		products = products.filter(function(product){
			return product.id != id;
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
		res.redirect('/products')
	}
}



module.exports = productsController;