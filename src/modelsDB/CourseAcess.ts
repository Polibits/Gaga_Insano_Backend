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
    CourseAccess: {
        type: Sequelize.ARRAY,
        allowNull: false
    }
});


/*

userID   |   CourseAccess
232323      ["curso1", "curso2", "curso3"]

{
  "usuário1": {
    "course001",
    "course002",
    "course003",
    "course004"
  },
  "usuário2": {
    "course001",
    "course002",
    "course003",
    "course004"
  }
}







*/