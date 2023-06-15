

import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/conn';

// Interface para o modelo
export interface UserCredentialsAttributes {
    userID: string;
    username: string;
    email: string;
    salt: string;
    password: string;
}

/**
 * Classe das Credenciais do Usuário
 */
class UserCredentials extends Model<UserCredentialsAttributes> implements UserCredentialsAttributes {
    public userID!: string;
    public username!: string;
    public email!: string;
    public salt!: string;
    public password!: string;

    /**
     * TODO
     * @param userID 
     * @param username 
     * @param email 
     * @param salt 
     * @param password 
     */
    constructor(userID: string, username: string, email: string, salt: string, password: string) {
        super();
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.salt = salt;
        this.password = password;
    }
}