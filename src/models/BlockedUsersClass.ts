import crypto from 'crypto'

const SALT_LENGHT = 128;
const DEFAULT_HASH = "sha256"

/**
 * Classe de Credencial do Usuário
 */
export class BlockedUsersClass {

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