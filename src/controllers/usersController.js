const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')

const usersFilePath = path.join(__dirname , '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

   	login: (req, res)=>{
        res.render('./users/login')
    },

    register: (req, res)=>{
        res.render('./users/register')
    }, 

    processUsersRegister :  (req , res) =>  {
		let contraseña;

		if (req.body.password == req.body.confirmPassword){

			contraseña = req.body.password

			let user = {
				id: (users.length + 1),
				name: req.body.name,
				email: req.body.email,
				tel: req.body.tel,
				password: bcryptjs.hashSync(contraseña,12),
			}

		users.push(user);
		
		fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf-8');
		res.redirect('/products');

		}else{
			res.redirect('/users/register')
		}
	}
}

module.exports = usersController;