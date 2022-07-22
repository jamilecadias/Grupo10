const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const User = require('../../models/User.js');

const usersFilePath = path.join(__dirname , '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
	fileName : ('../src/data/users.json'), 

   	login: (req, res)=>{
        res.render('./users/login')
    },

    register: (req, res)=>{
        res.render('./users/register')
    }, 

    processUsersRegister :  (req , res) =>  {
		const resultValidation = validationResult(req); 
		if (resultValidation.errors.length > 0){
			res.render('./users/register' , {
				errors : resultValidation.mapped(),
				oldData: req.body
			})
		 } 		
		let userInDB = User.findByEmail ('email' , req.body.email);
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
		}
	},
	
	processLogin: (req, res) => {
		let userToLogin = User.findByEmail('email' , req.body.email);
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
		})
	},
	profile: (req, res)=> {
		res.render('../views/users/profile' , {
			user: req.session.userLogged
		})
	},

	logout: (req, res) => {
		res.clearCookie('userEmail'); 
		req.session.destroy();
		return res.redirect('/')
	}

	}



module.exports = usersController;