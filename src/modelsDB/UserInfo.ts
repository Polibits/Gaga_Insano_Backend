import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';
import Auth from "../auth/auth";

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const UserInfo = sequelize.define('UserInfo', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    userType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    birthday: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
});