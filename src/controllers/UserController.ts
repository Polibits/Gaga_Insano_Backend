import { Request, Response } from "express"
import Sequelize, { Model } from "sequelize"
import { UserCredentials } from "../modelsDB/UserCredentials"
import { UserInfo } from "../modelsDB/UserInfo"
import { BlockedUsers } from "../modelsDB/BlockedUsers"
import { Credentials } from "../models/Credentials"
import { Message } from "../routes/messages"
import { UserInfos } from "../models/UserInfos"
import { userInfo } from "os"

export default class UserController {
  static deleteUser(arg0: string, deleteUser: any) {
    throw new Error("Method not implemented.")
  }

  static createUser(arg0: string, createUser: any) {
    throw new Error("Method not implemented.")
  }

  static loginUser(arg0: string, loginUser: any) {
    throw new Error("Method not implemented.")
  }

  /**
   * Registra credenciais do usuário na base de dados
   * @param req {email:"email", password:"password"}
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async registerCredentials(req: Request, res: Response) {
    var email: string = req.body.email
    var password: string = req.body.password
    var userCredentials = new Credentials("", "", "")
    userCredentials.generateCredentials(email, password)
    try {
      /* credenciais válidas */
      var creds = {
        hashedEmail: userCredentials.getHashedEmail(),
        hashedPassword: userCredentials.getHashedPassword(),
        salt: userCredentials.getSalt(),
      }

      if(!Credentials.validCredentials(email, password)) {
        /* credenciais inválidas */
        res.send(Message.response(
          400,
          "INVALID_CREDENTIALS",
          "não foi possível registrar credenciais",
          "credenciais inválidas",
          null
        ))
      } else {
        /* registro no banco de dados */
        const save = await UserCredentials.create(creds)

        /* resposta da API */
        res.send(Message.response(
          200,
          "SUCESS",
          "credenciais registradas com sucesso",
          "credenciais de usuário " + email + " foram registradas com sucesso no banco de dados",
          null
        ))
      }
    } catch (error) {
      /* credenciais inválidas */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível registrar credenciais",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Verifica se as credenciais de um usuário são compatíveis com o que está na base de dados
   * @param req {email:"email", password:"password"}
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async authenticateCredentials(req: Request, res: Response) {
    const email: string = req.body.email
    const password: string = req.body.password
    const hashedEmail = Credentials.hashedEmail(email)

    try {
      /* busca pelo usuário na base de dados */
      const user = UserCredentials.findOne({where: { hashedEmail: hashedEmail }})

      if (!user) {
        /* credencial não existe */
        res.send(Message.response(
          404,
          "USER_NOT_FOUND",
          "usuário não foi encontrado",
          "email informado não está registrado no banco de dados",
          null
        ))
      } else {
        /* credencial existe */
        user.then((user: any) => {
          const userCredentialsInDB = new Credentials(
            user.hashedEmail,
            user.hashedPassword,
            user.salt
          )

          const salt = user.salt

          if (userCredentialsInDB.authenticateCredentials(email, password, salt)) {
            /* credenciais válidas */
            res.send(Message.response(
              200,
              "SUCESS",
              "autenticação bem sucedida",
              "credenciais informadas estão de acordo com o registro no banco de dados",
              null
            ))
          } else {
            /* credenciais inválidas */
            res.send(Message.response(
              200,
              "WRONG_CREDENTIALS",
              "autenticação mal sucedida",
              "credenciais informadas não estão de acordo com o registro no banco de dados",
              null
            ))
          }
        })
      }

    } catch (error) {
      /* falha ao buscar usuário */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível autenticar usuário",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Deleta credenciais do usuário da base de dados
   * @param req {email:"email"}
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  public static async deleteUserCredentials(req: Request, res: Response) {
    const email: string = req.body.email
    const hashedEmail: string = Credentials.hashedEmail(email)

    try {
      /* deleção das credenciais */
      UserCredentials.destroy({ where: { hashedEmail: hashedEmail } })

      res.send(Message.response(
        200,
        "SUCESS",
        "credenciais removidas com sucesso",
        "dados relativos às credenciais informadas foram deletadas dos bancos de dados",
        null
      ))
    } catch (error) {
      /* falha ao deletar */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível remover credenciais do usuário",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Redefine as credenciais de usuário
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  public static async updateCredentials(req: Request, res: Response) {
    const email: string = req.body.email
    const hashedEmail: string = Credentials.hashedEmail(email)
    const hashedPassword: string = req.body.password

    const user = {
      hashedEmail: hashedEmail,
      hashedPassword
    }

    try {
      await UserCredentials.update(user, { where: { hashedEmail: hashedEmail } })

      /* credenciais atualizadas com sucesso */
      res.send(Message.response(
        200,
        "SUCESS",
        "credenciais atualizadas com sucesso",
        "credenciais foram modificadas nos bancos de dados com sucesso",
        null
      ))
    } catch (error) {
      /* falha ao atualizar */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível atualizar as credenciais",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Verifica se as credenciais de um usuário estão presentes na database
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  public static async CredentialsExistsInDB(req: Request, res: Response) {
    const email: string = req.body.email
    const hashedEmail: string = Credentials.hashedEmail(email)

    try {
      /* credenciais existem */
      const user = UserCredentials.find({ where: { hashedEmail: hashedEmail } })

      if (user != null){
        /* credenciais existem no banco de dados */
        res.send(Message.response(
          200,
          "USER_CREDENTIALS_EXISTS",
          "credenciais informadas existem no banco de dados",
          "credenciais foram modificadas nos bancos de dados com sucesso",
          null
        ))
      }
      else {
        res.send(Message.response(
          200,
          "USER_CREDENTIALS_DOES_NOT_EXISTS",
          "credenciais informadas não existem no banco de dados",
          "credenciais foram modificadas nos bancos de dados com sucesso",
          null
        ))
      }
    } catch (error) {
      /* falha ao deletar */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível verificar se as credenciais existem",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Cria um UserInfo
   * @param req {
            userID: "userID", 
            description: "description", 
            age: "age", 
            genero: "genero", 
            phone: "phone", 
            username: "username", 
            socialName: "socialName"
        }
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async registerUserInfo(req: Request, res: Response) {
    try {
      const userinfo = {
        userID: req.body.userID,
        userType: req.body.userType,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        cpf: req.body.cpf
      }

      try {
        await UserInfo.create(userInfo)
        res.send(Message.response(
          200,
          "SUCESS",
          "informações do usuário foram registradas com sucesso",
          "informações do usuário foram registradas nos bancos de dados com sucesso",
          userinfo
        ))
      } catch (error) {
        res.send(Message.response(
          500,
          "SERVER_ERROR",
          "não foi possível registrar informações do usuário",
          "erro interno do servidor",
          error
        ))
      }
    } catch (error) {
      /* falha ao registrar informação */
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível registrar informações do usuário",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Obtém as informações de um usuário em particular
   * @param req {userID: "userID"}
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async getUserInfo(req: Request, res: Response) {
    const userID: string = req.body.userID

    try {
      const user = await UserInfos.getUserInfoByID(userID)
      return user
      //TODO : necessário resolver a promise, recomendo fazer uma função em userInfos que pega o user
      // e retorna cada user.getData e forma um JSON, isso resolveria a promise facilmente e sem problemas.
    } catch (error) {
      
    }
  }

  /**
   * Obtém as informações de todos os usuários da base da dados
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async getAllUsersInfo(req: Request, res: Response) {
    //TODO
    try {
      UserInfo.findAll().then((promise: any) => {
        res.status(200).json(promise)
      })
    } catch (error: any) { }
  }

  /**
   * Atualiza as informações do usuário
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */

  static async updateUserInfo(req: Request, res: Response) {
    const userid = req.body.userID
    // TODO
  }

  /**
   * Deleta as informações do usuário da base de dados
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async deleteUserInfo(req: Request, res: Response) {
    const userid = req.body.id
    await UserInfos.deleteUserInfoByID(userid)
    //TODO
  }

  /**
   * Bloqueia usuário na base de dados
   * @param req {
            IP: IP,
            userID: userID,
            CPF: CPF,
            email: email,
    }
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async blockUser(req: Request, res: Response) {
    const IP: string = req.ip
    const userID: string = req.body.userID
    const CPF: string = req.body.CPF
    const email: string = req.body.email

    const blockedUser = {
      userID: userID,
      IP: IP,
      CPF: CPF,
      email: email
    }

    try {
      await BlockedUsers.create(blockedUser)
      res.send(Message.response(
        200,
        "SUCESS",
        "usuário bloqueado com sucesso",
        "usuário foi bloqueado com sucesso da plataforma",
        blockedUser
      ))
    } catch (error) {
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível bloquear usuário",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Desbloqueia usuário na base de dados
   * @param req {
            IP: IP,
            userID: userID,
            CPF: CPF,
            email: email,
    }
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async unblockUser(req: Request, res: Response) {
    const IP: string = req.ip
    const userID: string = req.body.userID
    const CPF: string = req.body.CPF
    const email: string = req.body.email

    const blockedUser = {
      IP: IP,
      userID: userID,
      CPF: CPF,
      email: email,
    }

    try {
      /* remover usuário da blacklist */
      BlockedUsers.destroy({ where: { CPF: CPF } })
      res.send(Message.response(
        200,
        "SUCESS",
        "usuário desbloqueado com sucesso",
        "usuário foi desbloqueado com sucesso da plataforma",
        null
      ))
    } catch (error) {
      res.send(Message.response(
        500,
        "SERVER_ERROR",
        "não foi possível desbloquear usuário",
        "erro interno do servidor",
        error
      ))
    }
  }

  /**
   * Obtém lista de todos os usuários bloqueados
   * @param req
   * @param res {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
   */
  static async getBlockedUsers(req: Request, res: Response) {
    try {
      return await BlockedUsers.findAll()
    } catch (error) {
      //TODO
    }
  }
}