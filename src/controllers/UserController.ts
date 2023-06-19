import { Request, Response } from 'express'
import Sequelize, { Model } from "sequelize";
import { UserCredentials } from '../modelsDB/UserCredentials';
import validationsUser from '../validations/validationsUser'
import Auth from '../auth/auth';
import UserUtil from '../utils/UserUtil';
import { UserCredentialsAttributes } from '../Interfaces/InterfaceUserCred';

const saltLenght = 128;

export default class UserController {
    /**
     * TODO
     * @param req 
     * @param res 
     * @returns 
     */
    static async createUser(req: Request, res: Response) {
        const name: string = req.body.name
        const email: string = req.body.email
        const password: string = req.body.password
        const username: string = req.body.username
        const confirmpassword: string = req.body.confirmpassword
        //const { name, email,  username, confirmpassword , password} = req.body

        const validation = validationsUser.RegisterValidation(name, email, username, password, confirmpassword)

        if (validation.length !== 0) {
            return res.status(501).json({ message: validation })
        }

        const salt = Auth.new_salt(saltLenght)
        const SHAPass = Auth.sha256(password + salt)
        const SHAemail = Auth.sha256(email)

        const AccountCreated = {
            name: name,
            email: SHAemail,
            username: username,
            salt: salt,
            password: SHAPass,
        }

        try {
            const save = await UserCredentials.create(AccountCreated);
            res.status(200).json({ message: "Deu certo" })
        } catch (error: any) {
            res.status(500).json({ message: error })
        }
    }


    static async loginUser(req: Request, res: Response) {
        const email: string = req.body.email
        const password: string = req.body.password

        if (!email && !password) {
            res.status(422).json({ message: 'O e-mail/ senha é obrigatório!' })
            return
        }

        const SHAemail = Auth.sha256(email)
        UserUtil.findByEmail(SHAemail).then(promise => {
            if (!promise) {
                res.status(422).json({ message: 'O e-mail não foi encontrado' })
            } else {
                const salt = promise.salt;
                const SHAPass = Auth.sha256(password + salt)
                const SHAemail = Auth.sha256(email)
                if (SHAemail == promise.email) {
                    if (SHAPass == promise.password) {
                        res.status(200).json({ message: 'Usuário Logado' })
                    } else {
                        res.status(422).json({ message: 'Senha Incorreta' })
                    }
                } else {
                    res.status(422).json({ message: 'O e-mail incorreto' })
                }
            }
        })

    }


    static async showAllUsers(req: Request, res: Response){
        UserCredentials.findAll().then((promise: any) => {
            return promise
        })

    
    }








}