const crypto = require("crypto");
const fs = require("fs");

class Note {
    constructor(titulo, mensagem, userID, id) {
        if (id) this.id = id;
        else this.id = crypto.randomUUID();
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.userID = userID;
    }
    static buscaNota(id) {
        const file = fs.readFileSync("./model/jsonDB/notes.json");
        const notas = JSON.parse(file);
        const data = notas.find((nota) => id.localeCompare(nota.id) == 0);
        if (data)
            return new Note(data.titulo, data.mensagem, data.userID, data.id);
        else return false;
    }
    static buscaNotasUsuario(id) {
        const file = fs.readFileSync("./model/jsonDB/notes.json");
        const notas = JSON.parse(file);
        const data = notas.filter((nota) => id.localeCompare(nota.userID) == 0);
        return data;
    }
    salvar() {
        const file = fs.readFileSync("./model/jsonDB/notes.json");
        const notas = JSON.parse(file);
        const index = notas.findIndex(
            (nota) => nota.id.localeCompare(this.id) == 0
        );
        if (index > -1) {
            notas[index].titulo = this.titulo;
            notas[index].mensagem = this.mensagem;
        } else {
            notas.push({
                id: this.id,
                titulo: this.titulo,
                mensagem: this.mensagem,
                userID: this.userID,
            });
        }
        fs.writeFileSync("./model/jsonDB/notes.json", JSON.stringify(notas));
    }
    remover() {
        const file = fs.readFileSync("./model/jsonDB/notes.json");
        const notas = JSON.parse(file);
        const index = notas.findIndex(
            (nota) => nota.id.localeCompare(this.id) == 0
        );
        if (index > -1) {
            notas.splice(index, 1);
        }
        fs.writeFileSync("./model/jsonDB/notes.json", JSON.stringify(notas));
    }
    static excluir(id) {
        const file = fs.readFileSync("./model/jsonDB/notes.json");
        const notas = JSON.parse(file);
        const index = notas.findIndex((nota) => nota.id.localeCompare(id) == 0);
        console.log(index);
        if (index > -1) {
            notas.splice(index, 1);
        }
        fs.writeFileSync("./model/jsonDB/notes.json", JSON.stringify(notas));
    }
}
module.exports = Note;
