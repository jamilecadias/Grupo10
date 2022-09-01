const path = require('path');
const fs = require('fs');
let db = require("../database/models");
const { Console } = require('console');
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op

/*const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const productsController = {

	products: (req, res) => {
		db.Products.findAll()
			.then(function (products) {
				res.render('./products/lista_productos', { products })
			})
	},

	detail: (req, res) => {
		db.Products.findByPk(req.params.id)
			.then(product =>
				//let idProducto = req.params.id;
				//let product;
				//for (let i=0; i<products.length; i++) {
				//   if (products[i].id == idProducto) {
				//		product = products[i];
				res.render('./products/producto', { product })
			)
	},

	create: (req, res) => {
		res.render('cargar_productos')
	},

	store: (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('./cargar_productos', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		db.Products.create({
			name: req.body.name,
			origin_id: req.body.origin,
			price: req.body.price,
			description: req.body.description,
			image: req.file.filename
		})
			.then(res.redirect('/products'))
			.catch(error => res.send(error))

	},





	edit: (req, res) => {

		db.Products.findByPk(req.params.id)
			.then(productToEdit =>

				/* let id = req.params.id;
				 globalThis.productToEdit = null;
				 for (let i=0; i<products.length; i++) {
					 if (products[i].id == id) {
						 productToEdit = products[i];
					 }
				 }*/
				res.render('editar_productos', { productToEdit })

			)
	},

	update: (req, res) => {








		db.Products.findByPk(req.params.id)
			.then((product) => {

				const resultValidation = validationResult(req);
				if (resultValidation.errors.length > 0) {
					return res.render('./editar_productos', {
						errors: resultValidation.mapped(),
						oldData: req.body,
						productToEdit: product
					})
				} else {

					let productToEdit = {
						...req.body,
						//image: req.file.filename
					}
					db.Products.update(
						productToEdit,
						{
							where: { id: product.id }
						}
					)
						.then(() =>
							res.redirect('/products')
						)
						.catch(error => res.send(error))


				}
			})

	},





	//  db.Products.update(
	// {
	// 	name: req.body.name,
	// 	origin_id: req.body.origin,
	// 	price: req.body.price,
	// 	description: req.body.description,
	// 	image: req.file.filename
	// },
	// {
	//  where: {id: req.params.id}, force: true
	// })


	/*let id = productToEdit.id;
	for (let i=0; i<products.length; i++) {
		if (products[i].id == id) {
			products[i].name = req.body.name;
			products[i].price = req.body.price;
			products[i].description = req.body.description;
			//*products[i].features = req.body.features;
			products[i].image = req.file.filename;
		} */

	//fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8'); /*


	destroy: (req, res) => {
		db.Products.destroy({
		where: { id: req.params.id }
	})

	// force: true es para asegurar que se ejecute la acción
	.then(() => {
		return res.redirect('/products')
	})
	.catch(error => res.send(error))

		// let id = req.params.id;
		// console.log(id);
		// products = products.filter(function(product){
		// 	return product.id != id;
		// })
		// fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
		// res.redirect('/products')
	},

search: (req, res) => {

	db.Products.findAll({
		where: {
			name: {
				[db.Sequelize.Op.like]: "%" + req.body.search + "%"
			}
		}
	})


		.then(function (products) {
			res.render('./products/lista_productos', { products })
		})

}
}



module.exports = productsController;