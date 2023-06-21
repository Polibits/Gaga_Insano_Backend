import { Credentials } from "../../models/Credentials";

class CredentialsTest implements Test {
    private testCredentials = {
        1:{
            testID: 1,
            body: {
                email:"maria@gmail.com",
                password:"maria123"
            },
            answer: {
                sucess: true,
                code: "SUCESS",
                resume: "usuário cadastrado com sucesso"
            }
        },
        2:{
            testID: 2,
            body: {
                email:"henrique_eduardo@gmail.com",
                password:"#Henrique123",
            },
            answer: {
                sucess: true,
                code: "SUCESS",
                resume: "usuário cadastrado com sucesso"
            }
        },
        3:{
            testID: 3,
            body: {
                email:"carlos_alberto@hotmail.com",
                password:"carlinhos",
            },
            answer: {
                sucess: true,
                code: "SUCESS",
                resume: "usuário cadastrado com sucesso"
            }
        },
        4:{
            testID: 4,
            body: {
                email:"cef@yahoo.com",
                password:"cef123123",
            },
            answer: {
                sucess: true,
                code: "SUCESS",
                resume: "usuário cadastrado com sucesso"
            }
        },
        5:{
            testID: 5,
            body: {
                email:"joao_skate123@gmail.com",
                password:"skate123",
            },
            answer: {
                sucess: true,
                code: "SUCESS",
                resume: "usuário cadastrado com sucesso"
            }
        },
        6:{
            testID: 6,
            body: {
                email:"",
                password:"",
            },
            answer: {
                sucess: false,
                code: "EMPTY_CREDENTIALS",
                resume: "email e senha vazios"
            }
        },
        7:{
            testID: 7,
            body: {
                email:"henrique_eduardo@hotmail.com",
                password:"",
            },
            answer: {
                sucess: false,
                code: "EMPTY_CREDENTIALS",
                resume: "campo senha está vazio"
            }
        },
        8:{
            testID: 8,
            body: {
                email:"",
                password:"123123123",
            },
            answer: {
                sucess: false,
                code: "EMPTY_CREDENTIALS",
                resume: "campo email está vazio"
            }
        },
        9:{
            testID: 9,
            body: {
                email:"henrique_eduardo@gmail.com",
                password:"skate123",
            },
            answer: {
                sucess: false,
                code: "ALREDY_REGISTERED",
                resume: "já há alguém na base de dado com estas credenciais"
            }
        },
        10:{
            testID: 10,
            body: {
                email:"larissa_gatagmailcom",
                password:"skate123",
            },
            answer: {
                sucess: false,
                code: "INVALID_FORMAT",
                resume: "formato de email incorreto"
            }
        }
    }

    /**
     * Realiza toda a bateria de testes automatizados
     */
    public runAllTests() {
        for(var credential in this.testCredentials) {
            // TODO implementar
        }
        return {}
    }

    /**
     * Realiza um teste específico
     * @param testID 
     * @returns 
     */
    public runTest(testID: number) {
        // TODO implementar
        return {}
    }
} 