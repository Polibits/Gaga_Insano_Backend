import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const CourseFramework = sequelize.define('CourseFramework', {
    comercialName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    courseID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priceInCents: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    courseTag: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


