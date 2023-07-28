import { Request, Response } from "express"
import Sequelize, { Model, Op } from "sequelize"
import { UserCredentials } from "../modelsDB/UserCredentials"
import { UserInfo } from "../modelsDB/UserInfo"
import { BlockedUsers } from "../modelsDB/BlockedUsers"
import { Credentials } from "../models/Credentials"
import { Message } from "../routes/messages"
import { UserInfos } from "../models/UserInfos"
import { userInfo } from "os"
import internal from "stream"
import { CourseAccess } from "../modelsDB/CourseAcess"
import { CourseFramework } from "../modelsDB/CourseModel"
import auth from "../auth/auth"

class CourseAccessController {
    /**
     * Adiciona um usuário na tabela
     * entrada: {UserID}
     */
    static async addUser(req: Request, res: Response) {
        const userID = req.body.userID
        const emptyArray : Array<String> = []
        const user = {userID: userID, CourseAccess: emptyArray}

        try {
            /* tenta registrar no banco de dados */
            const save = await CourseAccess.create(user)
            res.send(Message.response(
                200,
                "SUCESS",
                "operaçõa realidada com sucesso",
                "usuário adicionado na tabela de controle de acesso de cursos",
                null
            ))
        } catch (error) {
            /* erro genérico */
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "não foi possível registrar usuário na tabela de acesso de cursos",
                "erro interno do servidor",
                error
            ))
        }
    }

    /**
     * Deleta um usuário da tabela
     * entrada: {UserID}
     */
    static async deleteUser(req: Request, res: Response) {
        const userID = req.body.userID
        try {
            /* tentativa de deleção do usuário */
            CourseAccess.destroy({ where: { userID: userID } })
      
            res.send(Message.response(
              200,
              "SUCESS",
              "usuário removido com sucesso",
              "usuário id = " + userID + " removido com sucesso da tabela de acesso de cursos",
              null
            ))
          } catch (error) {
            /* falha ao deletar */
            res.send(Message.response(
              500,
              "SERVER_ERROR",
              "não foi possível remover usuário da tabela de acesso de cursos",
              "erro interno do servidor",
              error
            ))
          }
    }

    /**
     * Dá acesso a um curso de um certo usuário
     * entrada {UserID, [lista ids tags de cursos]}
     */
    static async giveAccess(req: Request, res: Response) {
        const userID = req.body.userID
        const tags = req.body.tags
    
        try {
            /* busca dos cursos do usuário */
            var actualAcess = CourseAccess.findOne({ where: { userID: userID } })
            var newAcess = actualAcess
            
            if(actualAcess == null){
                /* usuário não existe */
                res.send(Message.response(
                    500,
                    "USER_NOT_FOUND",
                    "usuário não foi encontrado",
                    "erro interno do servidor",
                    null
                  ))
            } else {
                /* usuário existe */
                newAcess = newAcess.CourseAccess.concat(tags)
            }
        } catch (error) {
            /* erro ao procurar cliente */
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "erro ao procurar por cliente na base de dados",
                "erro interno do servidor",
                error
              ))
        }
        
        try {
            /* tentativa de atualização da lista de cursos */
            await CourseAccess.update(newAcess, { where: { userID:userID } })
            res.send(Message.response(
              200,
              "SUCESS",
              "cursos liberados com sucesso",
              "acesso aos cursos foram atualizados no banco de dados com sucesso",
              null
            ))
        } catch (error) {
            /* falha ao atualizar */
            res.send(Message.response(
              500,
              "SERVER_ERROR",
              "não foi possível liberar cursos",
              "erro interno do servidor",
              error
            ))
        }    
    }

    /**
     * Retira acesso a um curso de um certo usuário
     * entrada {UserID, [lista ids tags de cursos]}
     */
    static async removeAccess(req: Request, res: Response) {
        const userID = req.body.userID
        const tags = req.body.tags

        var newAcess: any
    
        try {
            /* busca dos cursos do usuário */
            var actualAcess = CourseAccess.findOne({ where: { userID: userID } })
            newAcess = actualAcess
            
            if(actualAcess == null){
                /* usuário não existe */
                res.send(Message.response(
                    500,
                    "USER_NOT_FOUND",
                    "usuário não foi encontrado",
                    "erro interno do servidor",
                    null
                  ))
            } else {
                /* usuário existe */
                const oldArray = actualAcess.CourseAccess
                const result = oldArray.filter((item : any) => !tags.includes(item))
                newAcess.CourseAccess = result
            }
        } catch (error) {
            /* erro ao procurar cliente */
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "erro ao procurar por cliente na base de dados",
                "erro interno do servidor",
                error
              ))
        }
        
        try {
            /* tentativa de atualização da lista de cursos */
            await CourseAccess.update(newAcess, { where: { userID:userID } })
            res.send(Message.response(
              200,
              "SUCESS",
              "cursos removidos com sucesso",
              "acesso aos cursos foram atualizados no banco de dados com sucesso",
              null
            ))
        } catch (error) {
            /* falha ao atualizar */
            res.send(Message.response(
              500,
              "SERVER_ERROR",
              "não foi possível remover cursos",
              "erro interno do servidor",
              error
            ))
        }  
    }

    /**
     * Diz a que cursos um usuário tem acesso
     * entrada: {UserID}
     */
    static async getUserCourses(req: Request, res: Response) {
        const userID = req.body.userID
    
        try {
            /* busca dos cursos do usuário */
            var user = CourseAccess.findAll({ where: { userID: userID } })
            
            if(user == null){
                /* usuário não existe */
                res.send(Message.response(
                    500,
                    "USER_NOT_FOUND",
                    "usuário não foi encontrado",
                    "erro interno do servidor",
                    null
                  ))
            } else {
                /* usuário existe */
                res.send(Message.response(
                    200,
                    "SUCESS",
                    "cursos obtidos com sucesso",
                    "cursos obtidos com sucesso",
                    user.CourseAccess
                  ))
            }
        } catch (error) {
            /* erro ao procurar cliente */
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "erro ao procurar por cliente na base de dados",
                "erro interno do servidor",
                error
              ))
        }
    }
}

class CourseFrameworkController {

    /**
     * Criar um novo curso
     * entrada: {comercialName, courseID, description, priceInCents, courseTag}
     */
    static async register(req: Request, res: Response) {
        const comercialName = req.body.comercialName
        const description = req.body.description
        const priceInCents = req.body.priceInCents
        const courseTag = req.body.courseTag

        /* gera novo ID para curso */
        var courseID = auth.newCourseId()

        const course = {comercialName, courseID, description, priceInCents, courseTag}

        try{
            const save = await CourseFramework.create(course)
            res.send(Message.response(
                200,
                "SUCESS",
                "curso registrado com sucesso",
                "framework do curso registrado com sucesso na base de dados",
                null
              ))
        } catch(error) {
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "erro ao procurar por cliente na base de dados",
                "erro interno do servidor",
                error
              ))
        }
    }

    /**
     * Devolve todos os cursos cadastrados
     */
    static async getAllCourses(req: Request, res: Response) {
        try {
            var courses = CourseFramework.findAll()
            res.send(Message.response(
                200,
                "SUCESS",
                "cursos encontrados com sucesso",
                "cursos obtidos com sucesso, da base de dados",
                courses
              ))
        } catch (error) {
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "não foi possível obter cursos",
                "erro interno do servidor",
                error
              ))
        }
    }

    /**
     * Devolve um curso em particular
     * entrada: {courseID, courseTag}
     */
    static async getCourse(req: Request, res: Response) {
        const courseID = req.body.courseID
        const courseTag = req.body.courseTag

        try{
            const course = CourseFramework.findOne({ 
                where: { [Op.or] : [
                        {courseID : courseID},
                        {courseTag: { [Op.contains]: courseTag }}
                    ]}
                })
                
            if(course != null){
                /* curso encontrado */
                res.send(Message.response(
                    200,
                    "SUCESS",
                    "curso encontrado com sucesso",
                    "curso obtido com sucesso, da base de dados",
                    course
                  ))
            }else{
                /* curso não encontrado */
                res.send(Message.response(
                    200,
                    "COURSE_NOT_FOUND",
                    "curso não encontrado",
                    "curso não encontro na base de dados",
                    course
                  ))
            }
        }catch(error){
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "não foi possível obter cursos",
                "erro interno do servidor",
                error
              ))
        }
    }

    /**
     * Atualiza as informações de um curso
     * entrada: {comercialName, courseID, description, priceInCents, courseTag}
     */
    static async update(req: Request, res: Response) {
        const comercialName = req.body.comercialName
        const description = req.body.description
        const priceInCents = req.body.priceInCents
        const courseTag = req.body.courseTag
        const courseID = req.body.courseID

        var course: any

        const newCourse = {
            comercialName: comercialName,
            description: description,
            priceInCents: priceInCents,
            courseTag: courseTag
        }

        try {
            /* tentativa de atualização */
            const updateCourse = CourseFramework.update(newCourse, {where: {courseTag: courseTag}})
            /* busca se dá pelo courseID */

            res.send(Message.response(
                200,
                "SUCESS",
                "curso atualizado com sucesso",
                "curso atualizado com sucesso, na base de dados",
                course
              ))

        } catch (error) {
            /* erro ao atualizar */     
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "não foi possível atualizar curso",
                "erro interno do servidor",
                error
              ))       
        }
    }

    /**
     * Remove um curso do sistema
     * entrada: {courseID, courseTag}
     */
    static async delete(req: Request, res: Response) {
        const courseID = req.body.courseID
        const courseTag = req.body.courseTag

        var query = { 
            where: { [Op.or] : [
                    {courseID : courseID},
                    {courseTag: { [Op.contains]: courseTag }}
                ]}
            }
            
        try {
            /* tentativa de deleção do usuário */
            CourseFramework.destroy(query)
      
            res.send(Message.response(
                200,
                "SUCESS",
                "curso removido com sucesso",
                "curso id = " + courseID + " removido com sucesso do banco de dados",
                null
            ))
          } catch (error) {
            /* falha ao deletar */
            res.send(Message.response(
                500,
                "SERVER_ERROR",
                "não foi possível remover curso do sistema",
                "erro interno do servidor",
                error
            ))
          }
    }
}

class LecturesController {

    /**
     * Registrar uma nova aula 
     * entrada: {lectureID , privatePath, lectureNumber, description, lectureTitle, chapterTitle, chapterNumber, courseID}
     */
    static async register(req: Request, res: Response){
        
    }

    /**
     * Obtém todas as aulas de um certo curso
     * entrada: {courseID}
     */
    static async getAllLecturesFromCourse(req: Request, res: Response){
    
    }

    /**
     * Obtém uma aula, em específico, de um curso
     * entrada: {lectureID}
     */
    static async getLecture(req: Request, res: Response){
    
    }

    /**
     * Modificar atributos de uma aula
     * entrada: {lectureID, privatePath, lectureNumber, description, lectureTitle, chapterTitle, chapterNumber, courseID}
     */
    static async update(req: Request, res: Response){
        
    }

    /**
     * Deletar aula do sistema
     * entrada: {lectureID}
     */
    static async delete(req: Request, res: Response){
        
    }
}

export default {
    CourseAccessController,
    CourseFrameworkController,
    LecturesController
}