import { Request, Response } from "express"
import Sequelize, { Model } from "sequelize"
import { UserCredentials } from "../modelsDB/UserCredentials"
import { UserInfo } from "../modelsDB/UserInfo"
import { BlockedUsers } from "../modelsDB/BlockedUsers"
import { Credentials } from "../models/Credentials"
import { Message } from "../routes/messages"
import { UserInfos } from "../models/UserInfos"
import { userInfo } from "os"

class CourseAcessController {
    /**
     * Adiciona um usuário na tabela
     * entrada: {UserID}
     */
    static async addUser(req: Request, res: Response) {
        
    }

    /**
     * Deleta um usuário da tabela
     * entrada: {UserID}
     */
    static async deleteUser(req: Request, res: Response) {
        
    }

    /**
     * Dá acesso a um curso de um certo usuário
     * entrada {UserID, [lista ids tags de cursos]}
     */
    static async giveAccess(req: Request, res: Response) {
        // id: {"curso1", "curso2"} => id: {"curso1", "curso2", "curso3"}
    }

    /**
     * Retira acesso a um curso de um certo usuário
     * entrada {UserID, [lista ids tags de cursos]}
     */
    static async removeAccess(req: Request, res: Response) {
        // id: {"curso1", "curso2", "curso3"} => id: {"curso1", "curso2"}
    }

    /**
     * Diz a que cursos um usuário tem acesso
     * entrada: {UserID}
     */
    static async getUserCourses(req: Request, res: Response) {

    }
}

class CourseFrameworkController {

    /**
     * Criar um novo curso
     * entrada: {comercialName, courseID, description, priceInCents, courseTag}
     */
    static async register() {

    }

    /**
     * Devolve todos os cursos cadastrados
     */
    static async getAllCourses() {
        
    }

    /**
     * Devolve um curso em particular
     * entrada: {courseID, courseTag}
     */
    static async getCourse() {
        
    }

    /**
     * Atualiza as informações de um curso
     * entrada: {comercialName, courseID, description, priceInCents, courseTag}
     */
    static async update() {

    }

    /**
     * Remove um curso do sistema
     * entrada: {courseID, courseTag}
     */
    static async delete() {

    }
}

class LecturesController {

    /**
     * Registrar uma nova aula 
     * entrada: {lectureID , privatePath, lectureNumber, description, lectureTitle, chapterTitle, chapterNumber, courseID}
     */
    static async register(){

    }

    /**
     * Obtém todas as aulas de um certo curso
     * entrada: {courseID}
     */
    static async getAllLecturesFromCourse(){
    
    }

    /**
     * Obtém uma aula, em específico, de um curso
     * entrada: {lectureID}
     */
    static async getLecture(){
    
    }

    /**
     * Modificar atributos de uma aula
     * entrada: {lectureID, privatePath, lectureNumber, description, lectureTitle, chapterTitle, chapterNumber, courseID}
     */
    static async update(){
        
    }

    /**
     * Deletar aula do sistema
     * entrada: {lectureID}
     */
    static async delete(){
        
    }
}

export default {
    CourseAcessController,
    CourseFrameworkController,
    LecturesController
}