import { Request, Response } from 'express'
import Sequelize, { Model } from "sequelize";
import { UserCredentials } from '../modelsDB/UserCredentials';
import { UserInfo } from '../modelsDB/UserInfo'
import { BlockedUsers } from '../modelsDB/BlockedUsers';
import { BlockedUserAttributes } from '../Interfaces/interfaceBlockedUser';
import { BlockedUsersClass } from '../models/BlockedUsersClass';
import { Credentials } from '../models/Credentials';
import { Message, MessageCode } from '../routes/messages';
const saltLenght = 128;

export default class UserController {
    /**
     * Registra credenciais do usuário na base de dados
     * @param req {email:"email", password:"password"}
     * @param res 
     */
    static async registerCredentials(req: Request, res: Response) {
        var sucess = false
        const email: string = req.body.email
        const password: string = req.body.password

        var userCredentials = new Credentials("", "", "")
        userCredentials.generateCredentials(email, password)

        if(Credentials.validCredentials(email, password)){
            /* credenciais válidas */
            try {
                var creds = {
                    hashedEmail: userCredentials.getHashedEmail(),
                    hashedPassword: userCredentials.getHashedPassword(),
                    salt: userCredentials.getSalt()
                }

                /* registro no banco de dados */
                const save = await UserCredentials.create(creds)
                
                sucess = true
            } catch (error) {
                sucess = false
            }
        } else {
            /* credenciais inválidas */
            sucess = false
        }
        
        res.send({
            sucess:sucess
        })
    }

    /**
     * Verifica se as credenciais de um usuário são compatíveis com o que está na base de dados
     * @param req {email:"email", password:"password"}
     * @param res 
     */
    static async authenticateCredentials(req: Request, res: Response) {
        const email: string = req.body.email
        const password: string = req.body.password
        const hashedEmail = Credentials.hashedEmail(email)

        try {
            /* busca pelo usuário na base de dados */
            const user = UserCredentials.findOne({
                where: {
                    hashedEmail: hashedEmail
                }
            })

            if(!user){
                /* credenciais inexistentes */
            } else {
                /* validar credenciais */
                const userCredentialsInDB = new Credentials(
                    user.hashedEmail,
                    user.hashedPassword,
                    user.salt
                )
                const salt = user.salt

                if(userCredentialsInDB.authenticateCredentials(email, password, salt)){
                    /* credenciais válidas */
                } else {
                    /* credenciais inválidas */
                }
            }
            
        } catch (error) {
            /* falha ao procurar usuário */
        }
    }

    /**
     * Deleta credenciais do usuário da base de dados
     * @param req 
     * @param res 
     */
    public static async deleteUserCredentials(req: Request, res: Response) {
        const email: string = req.body.email
        const hashedEmail: string = Credentials.hashedEmail(email)

        try {
            /* deleção das credenciais */
            UserCredentials.destroy({
                where: {
                    hashedEmail:hashedEmail
                }
            })
        } catch (error) {
            /* falha ao deletar */
        }
    }

    static async getAllUsersInfo(req: Request, res: Response){
        try{
            UserInfo.findAll().then((promise: any) => {
                res.status(200).json(promise)
            })
        }catch(e : any){
            return e
        }
    }

    static async blockUser(req: Request, res: Response){
        const ipAddress : string = req.ip;
        const user_id :string = req.body.id

        const blockeduser = new BlockedUsersClass(ipAddress , user_id)

        try{
            await BlockedUsers.save(blockeduser)
            console.log("Usuário Bloqueado")
        }catch(e : any){
            console.log(e)
        }

    }
}