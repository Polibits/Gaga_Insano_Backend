

export class UserInfos{
    private userID : string | undefined 
    private description : string | undefined 
    private age : string | undefined 
    private genero : string | undefined 
    private phone : string | undefined 
    private username : string | undefined 
    private socialName : string | undefined 

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
        return this.genero;
      }
    
      public setGenero(genero: string): void {
        this.genero = genero;
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


