const fs = require ('fs');

const User = {
    fileName : ('src/data/users.json'),

    getData : function() {
        return JSON.parse(fs.readFileSync(this.fileName , 'utf-8'));
    },

    findAll : function () {
        return this.getData();
    },

    findByEmail : function (field , text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }, 

    //delete: function (id) {
    //    let allUsers = this.findAll();
    //    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
    //    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' ')); 
    //}

}



module.exports = User; 
