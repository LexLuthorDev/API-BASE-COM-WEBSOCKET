var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require('cors');


const { rateLimitPlugin } = require("./plugins/rateLimitPlugin");
const {ApiError, errorHandlerPlugin} = require("./plugins/errorHandlerPlugin");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

let adminRouter = require("./routes/admin");
let clienteRouter = require("./routes/cliente");
let estabelecimentoRouter = require("./routes/estabelecimento");
let pagamentoRouter = require("./routes/pagamento");


let socketRouter = require("./routes/socket");

var app = express();

app.use(cors({
    origin: '*',  // Altere para o domínio correto do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Adicione os métodos que deseja permitir
  }));

const setupSwagger = require("./swagger-jsdoc");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuração do Swagger
setupSwagger(app);

// Inicializa o plugin de rate limiting
rateLimitPlugin(app);


// Exemplo de rota que pode gerar um erro
app.get('/api/test', (req, res) => {
    // Simula um erro
    throw new ApiError(400, 'Erro de teste: algo deu errado!');
});

// Exemplo de rota válida
app.get('/api', (req, res) => {
    res.send('Bem-vindo à API!');
});




app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/api/admin", adminRouter);
app.use("/api/cliente", clienteRouter);
app.use("/api/estabelecimento", estabelecimentoRouter);
app.use("/api/pagamento", pagamentoRouter);

app.use("/api/socket", socketRouter);

// Usar o middleware de gerenciamento de erros após as rotas
app.use(errorHandlerPlugin);

module.exports = app;
