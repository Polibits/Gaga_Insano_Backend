import crypto from 'crypto'

/**
 * Classe do usuário
 */
class User {
    private ID: string | undefined             /* ID do usuário */
    private fullName: string | undefined       /* nome completo do usuário */
    private username: string | undefined       /* nome de usuário, pelo qual será chamado no sistema */
    private email: string | undefined          /* email do usuário */
    private userType: string | undefined       /* tipo do usuário */
    private integrityHash: string | undefined  /* hash de integridade do usuário */

    /* tipos de usuários */
    public static readonly USER_TYPE_STUDENT = "STUDENT"
    public static readonly USER_TYPE_ADM = "ADM"
    public static readonly USER_TYPE_TECH = "TECH"

    /**
     * Obtém o ID do usuário
     * @returns ID do usuário
     */
    public getID(){
        return this.ID
    }

    /**
     * Obtém o nome completo do usuário
     * @returns fullName do usuário
     */
    public getFullName(){
        return this.fullName
    }

    /**
     * Obtém o nome de usuário
     * @returns username do usuário
     */
    public getuUsername(){
        return this.username
    }

    /**
     * Obtém o email do usuário
     * @returns email do usuário
     */
    public getEmail(){
        return this.email
    }

    /**
     * Obtém o tipo do usuário
     * @returns userType do usuário
     */
    public getUserType(){
        return this.userType
    }

    /**
     * Obtém o hash de integridade do usuário
     * @returns integrityHash do usuário
     */
    public getIntegrityHash(){
        return this.integrityHash
    }

    /**
     * Redefine o ID do usuário
     * @param ID novo ID do usuário
     */
    public setID(ID:string) {
        this.ID = ID
    }

    /**
     * Redefine o fullName do usuário
     * @param ID novo fullName do usuário
     */
    public setFullName(fullName:string) {
        this.fullName = fullName
    }

    /**
     * Redefine o username do usuário
     * @param ID novo username do usuário
     */
    public setUsername(username:string) {
        this.username = username
    }

    /**
     * Redefine o email do usuário
     * @param ID novo email do usuário
     */
    public setEmail(email:string) {
        this.email = email
    }

    /**
     * Redefine o tipo do usuário
     * @param ID novo tipo do usuário
     */
    public setUserType(userType:string) {
        this.userType = userType
    }

    /**
     * Redefine o hash de integridade do usuário
     * @param ID novo hash de integridade do usuário
     */
    public setIntegrityHash(integrityHash:string) {
        this.integrityHash = integrityHash
    }
}

/* Exportações padrão */
export {
    User
}