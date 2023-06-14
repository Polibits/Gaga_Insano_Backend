"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv/config');
const { Sequelize } = require('sequelize');
console.log(process.env.DATABASE_NAME);
// credenciais de acesso do banco de dados mysql
/*
 const sequelize = new Sequelize(
    process.env.DB_NAME ,
    process.env.DB_USERNAME ,
    process.env.DB_PASSWORD,
    {
        host: 'localhost' ,
        dialect: 'mysql'
    }
)
*/
const sequelize = new Sequelize('GAGABACKEND', 'root', 'gui167', {
    host: 'localhost',
    dialect: 'mysql'
});
// Synchronize the model with the database
sequelize.sync()
    .then(() => console.log('Models synchronized with MySQL database'))
    .catch((error) => console.error('Error synchronizing models with MySQL database', error));
exports.default = sequelize;
