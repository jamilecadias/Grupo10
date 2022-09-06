const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const User = require('../../models/User.js');
let db = require("../database/models")

/*const usersFilePath = path.join(__dirname , '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));*/

const usersController = {
	//fileName : ('../src/data/users.json'),

   	login: (req, res)=>{
        res.render('./users/login')
    },

    register: (req, res)=>{
        res.render('./users/register')
    }, 

    processUsersRegister :  (req , res) =>  {
		const resultValidation = validationResult(req); 
		if (resultValidation.errors.length > 0){
			return res.render('./users/register' , {
				errors : resultValidation.mapped(),
				oldData: req.body
			})
		 } 	
		if (req.body.password == req.body.confirmPassword){
			let contrasena = req.body.password;
			let userToCreate = {
				...req.body, 
				password: bcryptjs.hashSync(contrasena,10),
				avatar: req.file.filename
			}
			db.Users.create(userToCreate)
			.then(()=>{
				res.redirect('/users/login')
			})
		// db.Users.create({
		// 		name: req.body.name,
		// 		email: req.body.email,
		// 		tel: req.body.tel,
		// 		password: bcryptjs.hashSync(contrasena,10),
		// 		avatar: req.file.filename
		// }).then(usuario => res.redirect ('/users/login'))
		.catch(error => res.render('../views/users/register' , {
			errors: {
				email : {
					msg: 'Este email ya está registrado.'
				},
				oldData: req.body
			} } ))
	} else{
			res.redirect('/users/register')
		}
		/*let userInDB = User.findByEmail ('email' , req.body.email);
		if (userInDB){
			return res.render ('../views/users/register' , {
				errors: {
					email : {
						msg: 'Este email ya está registrado.'
					},
					oldData: req.body
				} } );
			}
		let contraseña;
		if (req.body.password == req.body.confirmPassword){
			contraseña = req.body.password
			let user = {
				id: (users.length + 1),
				name: req.body.name,
				email: req.body.email,
				tel: req.body.tel,
				password: bcryptjs.hashSync(contraseña,12),
				avatar: req.file.filename
			}
		users.push(user);
		fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8');
		res.redirect('/users/login');
		}else{
			res.redirect('/users/register')
		}*/
	},
	
	processLogin: (req, res) => {

		const resultValidation = validationResult(req); 
		if (resultValidation.errors.length > 0){
			return res.render('./users/login' , {
				errors : resultValidation.mapped(),
				oldData: req.body
			})
		 } 	

		db.Users.findOne({
			where: {
				email : req.body.email},
			raw: true
			})
				.then(user => { 
					if (user){
						let pass = req.body.password;
						let correctPassword = bcryptjs.compareSync(pass , user.password);
						if (correctPassword) {
						delete user.password; 
						req.session.userLogged = user;
					if(req.body.recordarme) {
						res.cookie('userEmail' , req.body.email, { maxAge: (1000 * 60) * 3 } ); 
						}
				
					return res.redirect('/users/profile')
					} else {
				return res.render('./users/login', {
				errors: {
					email: {
						msg: 'Los datos son incorrectos.'
					}
				}
			})
		}}
		return res.render('./users/login', {
			errors: {
				email: {
					msg: 'Los datos son incorrectos.'
				}
			}
		})
				})
				
	




		/*let userToLogin = User.findByEmail('email' , req.body.email);
		if (userToLogin){
			let correctPassword = bcryptjs.compareSync(req.body.password , userToLogin.password);
			if (correctPassword) {
				delete userToLogin.password; 
				req.session.userLogged = userToLogin;
				if(req.body.recordarme) {
					res.cookie('userEmail' , req.body.email, { maxAge: (1000 * 60) * 3 } ); 
				}
				
				return res.redirect('/users/profile')
			} else {
			return res.render('./users/login', {
				errors: {
					email: {
						msg: 'Los datos son incorrectos.'
					}
				}
			})
		}}
		return res.render('./users/login', {
			errors: {
				email: {
					msg: 'Los datos son incorrectos.'
				}
			}
		})*/
	},

	
	profile: (req, res)=> {
		db.Users.findByPk(req.session.userLogged.id, {raw : true})
		.then ( ({id, name, email, tel, avatar}) => {
			const user = {id, name, email, tel, avatar}
			res.render('../views/users/profile' , {
			user
		})
		})
	},

	logout: (req, res) => {
		res.clearCookie('userEmail'); 
		req.session.destroy();
		return res.redirect('/')
	}, 

	edit: (req , res) => {
		//db.Users.findByPk(req.params.id)
		//	.then(userToEdit => 
		res.render('../views/users/edit_user', { userToEdit : req.session.userLogged })
		
		}, 
	

	update: (req, res) => {
		db.Users.update(
			{
				name: req.body.name,
				tel: req.body.tel,
				avatar: req.file.filename	
			},
			{
			 where: {
				id: (req.session.userLogged).id
			}, 
			}).then(()=>{
				res.redirect('/users/profile')
			})
	},
	destroy: (req, res) => {
		db.Users.destroy({
			where: {id: (req.session.userLogged).id }
		   })
		   // force: true es para asegurar que se ejecute la acción
        .then(()=>{
			res.clearCookie('userEmail'); 
			req.session.destroy();
            return res.redirect('/')})
        .catch(error => res.send(error)) 
	}
}



module.exports = usersController;