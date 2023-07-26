import crypto from 'crypto'

const SALT_LENGHT = 128;
const DEFAULT_HASH = "sha256"

/**
 * Classe de Credencial do Usuário
 */
class Credentials {
    private hashedEmail: string | undefined
    private hashedPassword: string | undefined
    private salt: string | undefined

    /**
     * Cria uma credencial
     * @param hashedEmail hash(email)
     * @param hashedPassword hash(senha + sal)
     * @param salt sal
     */
    public constructor(hashedEmail:string, hashedPassword:string, salt:string) {
        this.hashedEmail = hashedEmail
        this.hashedPassword = hashedPassword
        this.salt = salt
    }

    /**
     * Gera credenciais (hash(email) e hash(senha + sal)) a partir de email e senha
     * @param email email do usuário
     * @param password senha do usuário
     */
    public generateCredentials(email:string, password:string) {
        this.hashedEmail = this.hash(email)
        this.salt = this.newSalt()
        this.hashedPassword = this.hash(password + this.salt)
    }

    

    public setEmail(email:string) {
        this.hashedEmail = this.hash(email)
    }

    /**
     * Obtém o email, pós hash
     * @returns 
     */
    public getHashedEmail() {
        return this.hashedEmail
    }

    /**
     * Obtém a senha, pós hash
     * @returns senha, pós hash (senha + sal)
     */
    public getHashedPassword() {
        return this.hashedPassword
    }

    /**
     * Obtém o sal
     * @returns sal
     */
    public getSalt() {
        return this.salt
    }

    /**
     * Autentica as credenciais, isto é, verifica se o email e a senha informados são de fato da conta
     * @param email email informado
     * @param password senha informada
     * @param salt sal informado
     * @returns validade da credencial
     */
    public authenticateCredentials(email:string, password:string, salt:string) {
        var sucess = false

        /* validação de email */
        if(this.hash(email) == this.hashedEmail) {
            /* validação de senha */
            if(this.hash(password + salt) == this.hashedPassword) {
                sucess = true
            }
        }

        return sucess;
    }

    /**
     * Verifica se uma credencial é válida; ou seja, se cumpre regras pré-estabelecidas de formato e segurança
     * @param email email
     * @param password senha
     * @returns verdadeiro, 
     */
    public static validCredentials(email: string, password:string) {
        var sucess = true
        // TODO implementar
        return sucess
    }

    /**
     * Gera um sal aleatório
     * @returns uma string aleatória hexadecimal (de 128 caracteres por padrão)
     */
    public newSalt() {
        return crypto
            .randomBytes(Math.ceil(SALT_LENGHT/2))
            .toString("hex")
            .slice(0, SALT_LENGHT)
    }

    /**
     * Faz hash da entrada
     * @param input uma entrada qualquer, para passar pelo hash
     * @returns hash da entrada (sha-256 por padrão)
     */
    public hash(input:string) {
        return crypto
            .createHash(DEFAULT_HASH)
            .update(input)
            .digest("hex")
    }

    public static hashedEmail(email:string) {
        return crypto
            .createHash(DEFAULT_HASH)
            .update(email)
            .digest("hex")
    }
}

export {
    Credentials
}