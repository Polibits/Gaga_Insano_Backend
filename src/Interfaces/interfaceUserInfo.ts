import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/conn';

// Interface para o modelo
export interface UserInfosAttributes {
    userID: string;
    username: string;
    socialName: string;
    phone: string;
    genero: string;
    age: string
    description : string;
}

