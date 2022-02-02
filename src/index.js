const express = require('express')
const mongodb = require('./config/database')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Conectar ao banco de dados
mongodb.connect();

// Iniciar o servidor
mongoose.connection.on("open", function () {
    app.listen(process.env.PORT, () => {
        console.log('Servidor iniciado na porta', process.env.PORT);
    })
});

// Rotas
app.use('/api/auth', authRouter);