/**
 * Mensagens de resposta da API
 */
class Message {
    private sucess: boolean | undefined    /* sucesso ou não da operação */
    private code: MessageCode | undefined  /* códido padrão da mensagem (ex: USER_NOT_FOUND) */
    private resume: string | undefined     /* resumo da mensagem (ex: usuário não encontrado) */
    private details: string | undefined    /* texto informativo */

    /**
     * Construtor da mensagem
     * @param sucess sucesso ou não da operação
     * @param code códido padrão da mensagem (ex: USER_NOT_FOUND)
     * @param resume resumo da mensagem (ex: usuário não encontrado)
     * @param details texto informativo
     */
    constructor(sucess:boolean, code:MessageCode, resume:string, details:string) {
        this.sucess = sucess
        this.code = code
        this.resume = resume
        this.details = details
    }

    /**
     * Obtém a mensagem de resposta da API
     * @returns dicionário com os atributos da resposta ("sucess", "code", "resume" e "details")
     */
    public getMessage() {
        return {
            "sucess": this.sucess,
            "code": this.code?.getCode,
            "resume": this.resume,
            "details": this.details
        }
    }

    /**
     * Redefine todos os parâmetros da mensagem
     * @param sucess sucesso ou não da operação
     * @param code códido padrão da mensagem (ex: USER_NOT_FOUND)
     * @param resume resumo da mensagem (ex: usuário não encontrado)
     * @param details texto informativo
     */
    public setMessage(sucess:boolean, code:MessageCode, resume:string, details:string, hash:string) {
        this.sucess = sucess
        this.code = code
        this.resume = resume
        this.details = details
    }

    /**
     * Redefine status de sucesso da operação
     * @param sucess novo status de sucesso da operação
     */
    public setSucess(sucess:boolean) {
        this.sucess = sucess
    }

    /**
     * Redefine código da mensagem
     * @param code novo código da mensagem
     */
    public setCode(code:MessageCode) {
        this.code = code
    }

    /**
     * Redefine resumo da mensagem
     * @param resume novo resumo da mensagem
     */
    public setResume(resume:string) {
        this.resume = resume
    }

    /**
     * Redefine detalhe (texto explicativo) da mensagem
     * @param details novo texto explicativo
     */
    public setDetails(details:string) {
        this.details = details
    }
}

/**
 * Código da mensagem
 */
class MessageCode {
    /* código da mensagem */
    private code: string | undefined

    /* códigos gerais */
    public static readonly DEFAULT:string = "NONE"
    public static readonly SUCESS:string = "SUCESS"
    public static readonly FAIL:string = "FAIL"
    public static readonly FORBIDDEN_IP:string = "FORBIDDEN_IP"
    public static readonly INVALID_KEY:string = "INVALID_KEY"

    /* códigos relativos a usuários */
    public static readonly USER_NOT_FOUND:string = "USER_NOT_FOUND"
    public static readonly USER_INVALID_DATA:string = "INVALID_DATA"
    public static readonly USER_ALREDY_REGISTERED_DATA:string = "ALREDY_REGISTERED_DATA"

    /**
     * Construtor do código da mensagem
     * @param code 
     */
    constructor(code:string) {
        this.code = code
    }


    



    /**
     * Obtém o código
     * @returns código da mensagem
     */
    public getCode() {
        return this.code
    }

    /**
     * Redefine o código da mensagem
     * @param code 
     */
    public setCode(code:string) {
        this.code = code
    }
}

/**
 * Exportações padrão
 */
export {
    Message,
    MessageCode
}