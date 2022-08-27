const path = require('path');

const multer = require('multer'); 

// Multer users
const storageUsers = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images/usersImages'))
        
    },
    filename:(req, file, cb)=>{
        let userName = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, userName); 
    }

})
const uploadUser = multer({ storage : storageUsers });

module.exports = uploadUser