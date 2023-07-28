import crypto from 'crypto'

const saltLenght = 128;

export default  class Auth {

    /**
     * 
     * @param input 
     * @returns 
     */
    static sha256(input :string) {
        return crypto.createHash("sha256").update(input).digest("hex")
    }

    /**
     * 
     * @param length 
     * @returns 
     */
    static  new_salt(length :number) {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length)
    }

    /**
     * 
     * @param sha256 
     * @param salt 
     * @returns 
     */
    static auth_pass(sha256:string, salt:string){
        return (sha256 + salt)
    }

    /**
     * 
     * @param password 
     * @param salt 
     * @param auth_pass 
     * @returns 
     */
    static verify_auth(password:string, salt:string , auth_pass:string){
        const password256 = Auth.sha256(password)
        if(password256+salt == auth_pass)
            return true
        else 
            return false
        
    }

    /**
     * 
     * @returns 
     */
    static newUserId(){
        return (Math.floor(Math.random() * 256)).toString()
    }

    /**
     * 
     * @returns 
     */
    static newCourseId(){
        return (Math.floor(Math.random() * 256)).toString()
    }
    
}