export default class validationsUser {
    static RegisterValidation(name:string, email:string , password:string , confirmpassword:string){
        const errors: string[] = [];

        // Validar se todos os campos foram preenchidos
        if (!name || !email ||  !password || !confirmpassword)
            errors.push('Todos os campos são obrigatórios');

        // Validar se o email está em um formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        errors.push('Email inválido');
        }

        // Validar se a senha e a confirmação de senha coincidem
        if (password !== confirmpassword)
            errors.push('A senha e a confirmação de senha não coincidem');

        // Validar se o nome de usuário contém apenas letras e números
        //const usernameRegex = /^[a-zA-Z0-9]+$/;
        //if (!usernameRegex.test(username))
           // errors.push('O nome de usuário deve conter apenas letras e números');

        return errors;
    }


}