import { Request, Response } from "express";
import Sequelize, { Model } from "sequelize";
import { UserCredentials } from "../modelsDB/UserCredentials";
import { UserInfo } from "../modelsDB/UserInfo";
import { BlockedUsers } from "../modelsDB/BlockedUsers";
import { Credentials } from "../models/Credentials";
import { Message, MessageCode } from "../routes/messages";
import { UserInfos } from "../models/UserInfos";
import { userInfo } from "os";
import { MessageCodeEnum } from "../enums/errorMessages";
const saltLenght = 128;

export default class UserController {
  static deleteUser(arg0: string, deleteUser: any) {
    throw new Error("Method not implemented.");
  }
  static createUser(arg0: string, createUser: any) {
    throw new Error("Method not implemented.");
  }
  static loginUser(arg0: string, loginUser: any) {
    throw new Error("Method not implemented.");
  }
  /**
   * Registra credenciais do usuário na base de dados
   * @param req {email:"email", password:"password"}
   * @param res
   */

  static async registerCredentials(req: Request, res: Response) {
    var sucess = false;
    const email: string = req.body.email;
    const password: string = req.body.password;
    console.log(email, password)

    const userCredentials = new Credentials("", "", "");
    console.log("em baixo")
    console.log(userCredentials.getHashedEmail())
    userCredentials.generateCredentials(email, password);
    console.log("é pra aparecer algo")
    

    
      /* credenciais válidas */
      try {
        var creds = {
          hashedEmail: userCredentials.getHashedEmail(),
          hashedPassword: userCredentials.getHashedPassword(),
          salt: userCredentials.getSalt(),
        };
       

        /* registro no banco de dados */
        const save = await UserCredentials.create(creds);
        sucess = true;
      } catch (error) {
        sucess = false;
      }
    

    try {
      const UserIDCode = UserInfos.generateRandomId();
      console.log(UserIDCode);
      const stringofID = UserIDCode.toString();
      const userinfo = {
        userID: stringofID,
        description: null,
        age: null,
        gender: null,
        phone: null,
        username: null,
        socialName: null,
        cpf: null,
        birthday: null,
      };

      try {
        await UserInfo.create(userinfo);
        res.send({
          response: {
            status: 200,
            about: "UserInfo é Criado",
            message: MessageCodeEnum.SUCESS,
          },
        });
      } catch (e: any) {
        console.log(e);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
   * Verifica se as credenciais de um usuário são compatíveis com o que está na base de dados
   * @param req {email:"email", password:"password"}
   * @param res
   */
  static async authenticateCredentials(req: Request, res: Response) {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const hashedEmail = Credentials.hashedEmail(email);

    try {
      /* busca pelo usuário na base de dados */
      const user = UserCredentials.findOne({
        where: {
          hashedEmail: hashedEmail,
        },
        
      });
      

      if (!user) {
        res.send({
            response: {
              status: 500,
              about: "Credenciais não encontradas",
              message: MessageCodeEnum.FAIL,
            },
          });
      } else {
        console.log(user.hashedEmail)
        user.then((user : any)  => {
            const userCredentialsInDB = new Credentials(
                user.hashedEmail,
                user.hashedPassword,
                user.salt
              );
              
              const salt = user.salt;  

              if (
                
                userCredentialsInDB.authenticateCredentials(email, password, salt)
              ) {
                  res.send({
                      response: {
                        status: 200,
                        about: "USUÁRIO LOGADO",
                        message: MessageCodeEnum.SUCESS,
                      },
                    });
              } else {
                  res.send({
                      response: {
                        status: 500,
                        about: "Credenciais Erradas",
                        message: MessageCodeEnum.USER_NOT_FOUND
                      },
                    });
              }
        })
        
      }

    }catch(e: any){
        console.log(e)
    }



  }

  /**
   * Deleta credenciais do usuário da base de dados
   * @param req {email:"email"}
   * @param res
   */
  public static async deleteUserCredentials(req: Request, res: Response) {
    const email: string = req.body.email;
    const hashedEmail: string = Credentials.hashedEmail(email);

    try {
      /* deleção das credenciais */
      UserCredentials.destroy({
        where: {
          hashedEmail: hashedEmail,
        },
      });
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
    const email: string = req.body.email;
    const hashedEmail: string = Credentials.hashedEmail(email);
    const hashedPassword: string = req.body.password;

    const user = {
      hashedEmail: hashedEmail,
      hashedPassword,
    };

    try {
      await UserCredentials.update(user, {
        where: { hashedEmail: hashedEmail },
      });
    } catch (e: any) {}
  }

  /**
   * Verifica se as credenciais de um usuário estão presentes na database
   * @param req
   * @param res
   * @param Response
   */
  public static async CredentialsExistsInDB(req: Request, res: Response) {
    const email: string = req.body.email;
    const hashedEmail: string = Credentials.hashedEmail(email);

    try {
      /* deleção das credenciais */
      const user = UserCredentials.find({
        where: {
          hashedEmail: hashedEmail,
        },
      });
      if (user != null) {
        return true;
      } else {
        return false;
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
    try {
      const userId = req.body.userID;
      const userinfo = {
        description: req.body.description,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        username: req.body.username,
        socialName: req.body.socialName,
        cpf: req.body.cpf,
        birthday: req.body.birthday,
      };

      try {
        await UserInfo.update(userinfo, { where: { userID: userId } });
        res.send({
          response: {
            status: 200,
            about: "UserInfo é atualizado/Criado",
            message: MessageCodeEnum.SUCESS,
          },
        });
      } catch (e: any) {
        console.log(e);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
   * Obtém as informações de um usuário em particular
   * @param req
   * @param res
   */
  static async getUserInfo(req: Request, res: Response) {
    const id: string = req.body.id;

    try {
      const user = await UserInfos.getUserInfoByID(id);
      return user;
      //TODO : necessário resolver a promise, recomendo fazer uma função em userInfos que pega o user
      // e retorna cada user.getData e forma um JSON, isso resolveria a promise facilmente e sem problemas.
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
   * Obtém as informações de todos os usuários da base da dados
   * @param req
   * @param res
   * @returns
   */
  static async getAllUsersInfo(req: Request, res: Response) {
    try {
      UserInfo.findAll().then((promise: any) => {
        res.status(200).json(promise);
      });
    } catch (error: any) {}
  }

  /**
   * Atualiza as informações do usuário
   * @param req
   * @param res
   */

  static async updateUserInfo(req: Request, res: Response) {
    const userid = req.body.id;
    try {
      const user = await UserInfos.getUserInfoByID(userid);
      user.setAge(req.body.age);
      user.setDescription(req.body.description);
      user.setGender(req.body.age);
      user.setPhone(req.body.phone);
      user.setSocialName(req.body.socialName);
      user.setUsername(req.body.username);
      user.setCpf(req.body.cpf);
      user.setBirthday(req.body.birthday);
      try {
        await UserInfo.save(user);
      } catch (e: any) {
        console.log(e);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
   * Deleta as informações do usuário da base de dados
   * @param req
   * @param res
   */
  static async deleteUserInfo(req: Request, res: Response) {
    const userid = req.body.id;
    await UserInfos.deleteUserInfoByID(userid);
  }

  /**
   * Bloqueia usuário na base de dados
   * @param req
   * @param res
   */
  static async blockUser(req: Request, res: Response) {
    const IP: string = req.ip;
    const userID: string = req.body.userID;
    const CPF: string = req.body.CPF;
    const email: string = req.body.email;

    const blockedUser = {
      IP: IP,
      userID: userID,
      CPF: CPF,
      email: email,
    };

    try {
      /* bloqueio do usuário */
      await BlockedUsers.save(blockedUser);
      res.send({
        response: {
          status: 200,
          about: "User " + CPF + " foi bloqueado",
          message: MessageCodeEnum.SUCESS,
        },
      });
      // TODO implementar
    } catch (error: any) {
      res.send({
        response: {
          status: 200,
          about: error,
          message: MessageCodeEnum.SUCESS,
        },
      });
    }
  }

  /**
   * Desbloqueia usuário na base de dados
   * @param req
   * @param res
   */
  static async unblockUser(req: Request, res: Response) {
    const IP: string = req.ip;
    const userID: string = req.body.userID;
    const CPF: string = req.body.CPF;
    const email: string = req.body.email;

    const blockedUser = {
      IP: IP,
      userID: userID,
      CPF: CPF,
      email: email,
    };

    try {
      /* desbloqueio do usuário */
      // TODO implementar
    } catch (error: any) {
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
    try {
      return await BlockedUsers.findAll();
    } catch (e: any) {
      console.log(e);
    }
  }
}
