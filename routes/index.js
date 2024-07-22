const express = require("express");
const router = express.Router();
const Users = require("../model/json/user");

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
    const usuarioExiste = Users.buscaUsuario(login);
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
    const usuarioExiste = Users.buscaUsuario(login);
    // Se não existir, insere no banco, mostra mensagem de sucesso e retorna ao login
    if (!usuarioExiste) {
        const novo = new Users(login, senha, email);
        novo.salvar();
        res.render("cadastroSucesso", { title: "FlyApp", usuario: login });
    }
    // Se existir, mostra mensagem de erro e retorna ao cadastro
    else {
        res.render("cadastroErro", { title: "FlyApp", usuario: login });
    }
});

module.exports = router;
