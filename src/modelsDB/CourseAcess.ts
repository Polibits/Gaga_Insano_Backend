import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const CourseAccess = sequelize.define('CourseAccess', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    JsonAccess: {
        type: Sequelize.JSON,
        allowNull: false
    }
});


/*

{
  "userID": {
    "course001",
    "course002",
    "course003",
    "course004"
  }
}







*/