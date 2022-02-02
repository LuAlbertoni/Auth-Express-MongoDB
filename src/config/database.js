const mongoose = require('mongoose')
require('dotenv').config()

async function connect() {
    await mongoose
        .connect(process.env.MONGODB_URL + '/auth') // Conectando ao banco de dados
        .then(() => console.log('Conectado ao banco de dados com sucesso!')) // Se conectou
        .catch((error) => {
            console.log('Erro ao tentar conectar ao banco de dados:', error); // Se não conectou
        });
};

module.exports = { connect }