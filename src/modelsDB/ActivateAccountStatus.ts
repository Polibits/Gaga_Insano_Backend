import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';
import Auth from "../auth/auth";

export const ActivateAccountStatus = sequelize.define('ActivateAccountStatus', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    activate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});