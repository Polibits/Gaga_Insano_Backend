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
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    age: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    socialName: {
        type: Sequelize.STRING,
        allowNull: true
    }
});