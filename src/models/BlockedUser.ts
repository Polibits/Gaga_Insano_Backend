/**
 * Classe de Credencial do Usuário
 */
export class BlockedUser {

    private ip : string
    private id : string

    public getIp(): string {
        return this.ip;
      }
    
      public setIp(ip: string): void {
        this.ip = ip;
      }
    
      public getId(): string {
        return this.id;
      }
    
      public setId(id: string): void {
        this.id = id;
      }

      constructor(ip: string, id: string) {
        this.ip = ip;
        this.id = id;
      }



}