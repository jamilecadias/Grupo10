const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) =>{
    let alias = "Origins";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING 
        }
    }; 
    let config = {
        tableName : "origins",
        timestamps : false
    }

    const Origin = sequelize.define(alias , cols , config)

    return Origin;
}