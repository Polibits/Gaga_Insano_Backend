"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserCredentials_1 = require("../models/UserCredentials");
const validationsUser_1 = __importDefault(require("../validations/validationsUser"));
const auth_1 = __importDefault(require("../auth/auth"));
const saltLenght = 128;
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const username = req.body.username;
            const confirmpassword = req.body.confirmpassword;
            //const { name, email,  username, confirmpassword , password} = req.body
            const validation = validationsUser_1.default.RegisterValidation(name, email, username, password, confirmpassword);
            if (validation != null) {
                return res.status(500).json({ message: validation });
            }
            const salt = auth_1.default.new_salt(saltLenght);
            const SHAPass = auth_1.default.sha256(password + salt);
            const SHAemail = auth_1.default.sha256(email);
            const AccountCreated = {
                name: name,
                email: SHAemail,
                username: username,
                salt: salt,
                password: SHAPass,
            };
            try {
                const save = yield UserCredentials_1.UserCredentials.create(AccountCreated);
                res.status(200).json({ message: "Deu certo" });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = UserController;
