import { Request, Response } from 'express'
import Sequelize, { Model } from "sequelize";
import { UserCredentials } from '../modelsDB/UserCredentials';
import { UserInfo } from '../modelsDB/UserInfo'
import { BlockedUsers } from '../modelsDB/BlockedUsers';
import { Credentials } from '../models/Credentials';
import { Message, MessageCode } from '../routes/messages';
import { UserInfos } from '../models/UserInfos';
import { userInfo } from 'os';
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
     * @param req {email:"email"}
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
            // TODO implementar
        } catch (error) {
            /* falha ao deletar */
            // TODO implementar
        }
    }

    /**
     * Redefine as credenciais de usuário
     * @param req 
     * @param res 
     */
    public static async updateCredentials(req: Request, res: Response) {
        const email: string = req.body.email
        const hashedEmail: string = Credentials.hashedEmail(email)
        const hashedPassword : string = req.body.password

        const user = {
            hashedEmail : hashedEmail,
            hashedPassword
        }

        try{
            await UserCredentials.update(user, {where: {hashedEmail: hashedEmail}});
        }catch(e : any){

        }
        
    }

    /**
     * Verifica se as credenciais de um usuário estão presentes na database
     * @param req 
     * @param res 
     * @param Response 
     */
    public static async CredentialsExistsInDB(req: Request, res: Response) {
        const email: string = req.body.email
        const hashedEmail: string = Credentials.hashedEmail(email)

        try {
            /* deleção das credenciais */
            const user = UserCredentials.find({
                where: {
                    hashedEmail:hashedEmail
                }
            })
            if(user != null){
                return true
            }else{
                return false
            }
        } catch (error) {
            /* falha ao deletar */
            // TODO implementar
        }
    }

   /**
     * Cria um UserInfo
     *  @param req {
     *  private userID : string | undefined 
        private description : string | undefined 
        private age : string | undefined 
        private genero : string | undefined 
        private phone : string | undefined 
        private username : string | undefined 
        private socialName }
     * @param res 
     */
    static async registerUserInfo(req: Request, res: Response) {
        try{
            const userinfo = {
                description : req.body.description,
                age : req.body.age,
                genero : req.body.genero,
                phone : req.body.phone,
                username : req.body.username,
                socialName : req.body.socialName
            }

            try{
                await UserInfo.save(userinfo)
            }catch(e : any){
                console.log(e)
            }
        }catch(e : any){
            console.log(e)
        }

        
        
    }

    /**
     * Obtém as informações de um usuário em particular
     * @param req 
     * @param res 
     */
    static async getUserInfo(req: Request, res: Response) {
        const id :string = req.body.id

        try{
            const user = await UserInfos.getUserInfoByID(id)
            return user
            //TODO : necessário resolver a promise, recomendo fazer uma função em userInfos que pega o user
            // e retorna cada user.getData e forma um JSON, isso resolveria a promise facilmente e sem problemas.
        }catch(e : any){
            console.log(e)
        }

        
    }

    /**
     * Obtém as informações de todos os usuários da base da dados
     * @param req 
     * @param res 
     * @returns 
     */
        static async getAllUsersInfo(req: Request, res: Response){
            try{
                UserInfo.findAll().then((promise: any) => {
                    res.status(200).json(promise)
                })
            }catch(error: any){
                
            }
        }

    /**
     * Atualiza as informações do usuário
     * @param req 
     * @param res 
     */
    
    static async updateUserInfo(req: Request, res: Response) {
        const userid = req.body.id
        try{
            const user = await UserInfos.getUserInfoByID(userid)
            user.setAge(req.body.age)
            user.setDescription(req.body.description)
            user.setGenero(req.body.age)
            user.setPhone(req.body.phone)
            user.setSocialName(req.body.socialName)
            user.setUsername(req.body.username)
            try{
                await UserInfo.save(user)
            }catch(e : any){
                console.log(e)
            }
            
        }catch(e : any){
            console.log(e)
        }
        
    }

    /**
     * Deleta as informações do usuário da base de dados
     * @param req 
     * @param res 
     */
    static async deleteUserInfo(req: Request, res: Response) {
        const userid = req.body.id
        await UserInfos.deleteUserInfoByID(userid)
    }

    /**
     * Bloqueia usuário na base de dados
     * @param req 
     * @param res 
     */
    static async blockUser(req: Request, res: Response){
        const IP: string = req.ip
        const userID: string = req.body.userID
        const CPF: string = req.body.CPF
        const email: string = req.body.email

        const blockedUser = {
            IP: IP,
            userID: userID,
            CPF: CPF,
            email: email
        }

        try{
            /* bloqueio do usuário */
            await BlockedUsers.save(blockedUser)
            // TODO implementar
        }catch(error: any){
            /* falha ao bloquear usuário */
            // TODO implementar
        }
    }

    /**
     * Desbloqueia usuário na base de dados
     * @param req 
     * @param res 
     */
    static async unblockUser(req: Request, res: Response){
        const IP: string = req.ip
        const userID: string = req.body.userID
        const CPF: string = req.body.CPF
        const email: string = req.body.email

        const blockedUser = {
            IP: IP,
            userID: userID,
            CPF: CPF,
            email: email
        }

        try{
            /* desbloqueio do usuário */
            // TODO implementar
        }catch(error: any){
            /* falha ao desbloquear usuário */
            // TODO implementar
        }
    }

    /**
     * Obtém lista de todos os usuários bloqueados
     * @param req 
     * @param res 
     */
    static async getBlockedUsers(req: Request, res: Response) {
        try{
            return await BlockedUsers.findAll();
        }catch(e : any){
            console.log(e)
        }

    }
}