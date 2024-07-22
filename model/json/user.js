const crypto = require("crypto");
const fs = require("fs");

class User {
    constructor(login, senha, email, id) {
        if (id) this.id = id;
        else this.id = crypto.randomUUID();
        this.login = login;
        this.senha = senha;
        this.email = email;
    }
    static buscaUsuario(login) {
        const file = fs.readFileSync("./model/jsonDB/users.json");
        const usuarios = JSON.parse(file);
        const data = usuarios.find(
            (user) => login.localeCompare(user.login) == 0
        );
        if (data) return data;
        else return false;
    }
    salvar() {
        const file = fs.readFileSync("./model/jsonDB/users.json");
        const usuarios = JSON.parse(file);
        usuarios.push({
            id: this.id,
            login: this.login,
            senha: this.senha,
            email: this.email,
        });
        fs.writeFileSync("./model/jsonDB/users.json", JSON.stringify(usuarios));
    }
    remover() {
        // fora do escopo do exercício, não foi definida rota para remover ou alterar usuario
    }
}
module.exports = User;
