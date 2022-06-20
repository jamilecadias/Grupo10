const path = require('path');

const mainController = {
    home : (req, res)=>{
        res.render('home')
    },
    
    producto: (req, res)=>{
        res.render('./products/producto')
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