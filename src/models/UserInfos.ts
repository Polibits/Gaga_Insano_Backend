import { DataType } from 'sequelize'
import { UserInfo } from '../modelsDB/UserInfo'
import { User } from './User'
import crypto from 'crypto';
export class UserInfos{
    private userID : string | undefined 
    private description : string | undefined 
    private age : string | undefined 
    private gender : string | undefined 
    private phone : string | undefined 
    private username : string | undefined 
    private socialName : string | undefined 
    private cpf : string | undefined
    private birthday : DataType | undefined

    public static async  getUserInfoByID( userID : string){
      const user : UserInfos = await UserInfo.find({where: { userID : userID}})
      return user
    }

    public static async deleteUserInfoByID( userID : string){
      try{
        await UserInfo.delete({where:{userID : userID}})
      }catch(e:any){
        console.log(e)
      }
    }

    

    public static generateRandomId(): string {
      const idLength = 10;
      const randomBytes = crypto.randomBytes(idLength);
      const randomId = randomBytes.toString('hex');
    
      return randomId;
    }
    

    

    public getUserID(): string | undefined {
        return this.userID;
      }
    
      public setUserID(userID: string): void {
        this.userID = userID;
      }
    
      public getDescription(): string | undefined {
        return this.description;
      }
    
      public setDescription(description: string): void {
        this.description = description;
      }
    
      public getAge(): string | undefined {
        return this.age;
      }
    
      public setAge(age: string): void {
        this.age = age;
      }
    
      public getGenero(): string | undefined {
        return this.gender;
      }
    
      public setGenero(genero: string): void {
        this.gender = genero;
      }
    
      public getPhone(): string | undefined {
        return this.phone;
      }
    
      public setPhone(phone: string): void {
        this.phone = phone;
      }
    
      public getUsername(): string | undefined {
        return this.username;
      }
    
      public setUsername(username: string): void {
        this.username = username;
      }
    
      public getSocialName(): string | undefined {
        return this.socialName;
      }
    
      public setSocialName(socialName: string): void {
        this.socialName = socialName;
      }

      



}


