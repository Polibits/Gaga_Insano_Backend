"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const conn_1 = __importDefault(require("./db/conn"));
const port = 3003;
const app = (0, express_1.default)();
// Express Config
//app.use(express.json())  
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/user', userRoutes_1.default);
/* Conexão Sync */
const force = false;
conn_1.default.sync({ force: force }) // colocar force: true ao alterar dados no BD
    .then(() => {
    console.log('server rodando na porta: ', port);
    app.listen(port);
})
    .catch((err) => { console.log(err); });
//.sync({ force: true}
