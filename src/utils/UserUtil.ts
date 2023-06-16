import { UserCredentialsAttributes } from "../Interfaces/InterfaceUserCred";
import { UserCredentials } from "../modelsDB/UserCredentials";

export default class UserUtil{

    static async findById(){

    }

    static async findByEmail(email:string){

        try{
            const user : UserCredentialsAttributes = await UserCredentials.findOne({where: { email: email }})
            return user
        }catch(e : any){
            return e
        }
        
        
    }
}