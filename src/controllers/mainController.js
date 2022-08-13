const path = require('path');
const fs = require('fs');

let db = require("../database/models")
// const productsFilePath = path.join(__dirname, '../data/products.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const mainController = {
    home : (req, res)=>{

        db.Products.findAll()
        .then (products=> {
            res.render('home',{products})
        })
        
    },
        
    carrito: (req, res)=>{
        res.render('carrito')
    },
}

module.exports = mainController;