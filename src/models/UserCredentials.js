"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentials = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = __importDefault(require("../db/conn"));
const auth_1 = __importDefault(require("../auth/auth"));
// Define a model
exports.UserCredentials = conn_1.default.define('userCredentials', {
    userID: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => {
            return auth_1.default.newUserId(); // Chame uma função para gerar o userID aqui
        }
    },
    username: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
