import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';
import Auth from "../auth/auth";
// Define a model
export const UserCredentials = sequelize.define('userCredentials', {
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => {
      return Auth.newUserId(); // Chame uma função para gerar o userID aqui
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
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
