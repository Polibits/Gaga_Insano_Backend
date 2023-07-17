import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const UserCredentials = sequelize.define('userCredentials', {
    
    hashedEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    }
});