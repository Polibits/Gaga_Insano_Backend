import Sequelize, { Model } from "sequelize";
import sequelize from '../db/conn';

/**
 * Define modelo das credenciais do usuário, no banco de dados
 */
export const Lectures = sequelize.define('Lectures', {
    lectureID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    courseID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    chapterNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    chapterTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lectureTitle: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    lectureNumber : {
        type: Sequelize.STRING,
        allowNull: false
    },
    privatePath : {
        type: Sequelize.STRING,
        allowNull: false
    }
});