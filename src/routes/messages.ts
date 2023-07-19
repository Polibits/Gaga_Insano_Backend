/**
 * Mensagens de resposta da API
 */
class Message {
    static response(httpStatus:number, code:string, message:string, details:string, additionalInfo:any|null) {
        return {
            httpStatus: httpStatus,
            code: code,
            message: message,
            details: details,
            additionalInfo:additionalInfo
        }
    }
}

/**
 * Exportações padrão
 */
export {
    Message
}