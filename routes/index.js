const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

/* GET home page (login form). */
router.get("/", function (req, res, next) {
    res.render("index", { title: "FlyApp", tentouLogar: false });
});
/* GET /cad (cadastro form). */
router.get("/cadastro", function (req, res, next) {
    res.render("formCadastro", { title: "FlyApp" });
});
/* POST / (tenta login). */
router.post("/", function (req, res, next) {
    const { login, senha } = req.body;
    // Verifica se usuário já existe no banco
    const usuarioExiste = buscaUsuario(login);
    // Se o usuário existe, verifica se a senha está correta e redireciona para dashboard
    if (usuarioExiste) {
        if (usuarioExiste.senha.localeCompare(senha) == 0) {
            res.redirect("/u/" + usuarioExiste.id);
        }
    }
    // Se o usuário não existe ou a senha est´qa incorreta mostra a página de login com mensagem de erro
    res.render("index", { title: "FlyApp", tentouLogar: true });
});
/* POST /cad (tenta cadastro). */
router.post("/cadastro", function (req, res, next) {
    const { login, senha, email } = req.body;
    // Verifica se usuário já existe no banco
    const usuarioExiste = buscaUsuario(login);
    // Se não existir, insere no banco, mostra mensagem de sucesso e retorna ao login
    if (!usuarioExiste) {
        insereNovoUsuario(crypto.randomUUID(), login, senha, email);
        res.render("cadastroSucesso", { title: "FlyApp", usuario: login });
    }
    // Se existir, mostra mensagem de erro e retorna ao cadastro
    else {
        res.render("cadastroErro", { title: "FlyApp", usuario: login });
    }
});

module.exports = router;

function buscaUsuario(nome) {
    const file = fs.readFileSync("./usersDB.json");
    const usuarios = JSON.parse(file);
    const data = usuarios.find((user) => nome.localeCompare(user.login) == 0);
    if (data) return data;
    else return false;
}

function insereNovoUsuario(id, login, senha, email = "") {
    const file = fs.readFileSync("./usersDB.json");
    const usuarios = JSON.parse(file);
    usuarios.push({ id: id, login: login, senha: senha, email: email });
    fs.writeFileSync("./usersDB.json", JSON.stringify(usuarios));
}
