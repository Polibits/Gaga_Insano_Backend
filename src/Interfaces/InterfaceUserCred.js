"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Classe do modelo
class UserCredentials extends sequelize_1.Model {
    constructor(userID, username, email, salt, password) {
        super();
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.salt = salt;
        this.password = password;
    }
}
