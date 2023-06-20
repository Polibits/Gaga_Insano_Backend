import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';
import Auth from "../auth/auth";

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const UserCredentials = sequelize.define('userCredentials', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => {
            return Auth.newUserId(); // Chame uma função para gerar o userID aqui
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    } 
});