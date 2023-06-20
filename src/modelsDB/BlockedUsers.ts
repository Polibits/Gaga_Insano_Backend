import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';
import Auth from "../auth/auth";

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const BlockedUsers = sequelize.define('BlockedUsers', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    IP: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    CPF: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
});