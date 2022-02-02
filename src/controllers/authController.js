const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')

// Registro de usuário
async function register(req, res) {
    try {
        // Coletando os dados do usuário
        const { username, email, password } = req.body;

        // Se os campos não estiverem vazios
        if (username && password && email !== undefined) {
            // Verificando se o usuário já existe
            const userCheck = await User.findOne({ email });

            if (userCheck) {
                return res.status(401).send("Nome de usuário já existente");
            }

            // Criptografando a senha
            const encryptedPassword = await bcryptjs.hash(password, 10);

            // Criando o usuário no banco de dados
            const user = await User.create({
                username,
                password: encryptedPassword,
                email: email.toLowerCase(),
            });

            // Removendo a senha do usuário
            user.password = undefined;

            // Retornando o usuário criado
            res.status(201).json(user);
        } else {
            res.status(400).send("Preencha todos os campos");
        }
    } catch (error) {
        res.status(400).send("Erro ao cadastrar usuário");
        console.log(error);
    }
};

// Login de usuário
async function login(req, res) {
    try {
        // Coletando os dados do usuário
        const { username, email, password } = req.body;

        // Se os campos não estiverem vazios
        if (username && password !== undefined || email && password !== undefined) {
            // Verificando se o usuário existe
            const userCheck = await User.findOne({ $or: [{ username }, { email }] });

            if (!userCheck) {
                return res.status(401).send("Usuário não encontrado");
            }

            // Comparando a senha coletada com a senha criptografada
            const passwordCheck = await bcryptjs.compare(password, userCheck.password);

            if (!passwordCheck) {
                res.status(401).send("Senha incorreta");
            }

            // Removendo a senha do usuário
            userCheck.password = undefined;

            // Se a senha estiver correta, retorna mensagem de sucesso
            if (passwordCheck) {
                res.status(200).send("Login realizado com sucesso");
            }
        } else {
            res.status(400).send("Preencha todos os campos");
        }
    } catch (error) {
        res.status(400).send("Erro ao logar usuário");
        console.log(error);
    }
};

module.exports = { register, login }