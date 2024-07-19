// ROTAS A PARTIR DE /U/ID, INDICANDO USUÁRIO LOGADO
const crypto = require("crypto");
const fs = require("fs");
const express = require("express");
const router = express.Router();

/* GET /u/:id (homepage, anotações e navegação). */
router.get("/:id", function (req, res, next) {
    const userID = req.params.id;
    const file = fs.readFileSync("notesDB.json");
    const data = JSON.parse(file);
    const userNotes = data.find((user) => user.id.localeCompare(userID) == 0);
    res.render("verTodos", {
        title: "FlyApp",
        notas: userNotes.notas,
        userID: userID,
    });
});
/* GET /u/:id/novo (form anotação nova). */
router.get("/:id/novo", function (req, res, next) {
    res.render("formNovo", { title: "FlyApp", userID: req.params.id });
});
/* POST /u/:id/novo (salva anotação nova). */
router.post("/:id/novo", function (req, res, next) {
    const userID = req.params.id;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const indice = data.findIndex(
        (entry) => userID.localeCompare(entry.id) == 0
    );
    const novaNota = {
        id: crypto.randomUUID(),
        titulo: req.body.titulo,
        mensagem: req.body.mensagem,
    };
    // já existem anotações
    if (indice > -1) {
        data[indice].notas.push(novaNota);
    }
    // é a 1a anotação desse usuário
    else {
        const novoBloco = {
            id: userID,
            notas: [novaNota],
        };
        data.push(novoBloco);
    }
    fs.writeFileSync("notesDB.json", JSON.stringify(data));
    res.redirect("/u/" + userID);
});
/* GET /u/:id/:idNota (acessa anotação existente). */
router.get("/:id/:idNota", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const userNotes = data.find((user) => {
        user.id.localeCompare(userID) == 0;
    });
    if (userNotes) {
        const nota = userNotes.notas.find((nota) => {
            nota.id.localeCompare(noteID) == 0;
        });
        res.render("verNota", {
            title: "FlyApp",
            userID: req.params.id,
            nota: nota,
        });
    } else {
        res.redirect("/u/" + userID);
    }
});
/* GET /u/:id/:idNota/edit (form para editar anotação existente). */
router.get("/:id/:idNota/edit", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const userNotes = data.find((user) => {
        return user.id.localeCompare(userID) == 0;
    });
    if (userNotes) {
        const nota = userNotes.notas.find((nota) => {
            return nota.id.localeCompare(noteID) == 0;
        });
        res.render("formEditar", {
            title: "FlyApp",
            userID: req.params.id,
            nota: nota,
        });
    } else {
        res.redirect("/u/" + userID);
    }
});
/* POST /u/:id/:idNota/edit (salva alteração em anotação existente). */
router.post("/:id/:idNota/edit", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const userNotes = data.findIndex((user) => {
        return user.id.localeCompare(userID) == 0;
    });
    if (userNotes > -1) {
        const noteIndex = data[userNotes].notas.findIndex(
            (nota) => nota.id.localeCompare(noteID) == 0
        );
        console.log(data[userNotes].notas[noteIndex]);
        console.log(req.body);
        data[userNotes].notas[noteIndex].titulo = req.body.titulo;
        data[userNotes].notas[noteIndex].mensagem = req.body.mensagem;
        fs.writeFileSync("notesDB.json", JSON.stringify(data));
    }
    res.redirect("/u/" + userID);
});
/* GET /u/:id/:idNota/excluir (form para excluir anotação existente). */
router.get("/:id/:idNota/excluir", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const userNotes = data.find((user) => {
        return user.id.localeCompare(userID) == 0;
    });
    if (userNotes) {
        const nota = userNotes.notas.find((nota) => {
            return nota.id.localeCompare(noteID) == 0;
        });
        res.render("formExcluir", {
            title: "FlyApp",
            userID: req.params.id,
            nota: nota,
        });
    } else {
        res.redirect("/u/" + userID);
    }
});
/* POST /u/:id/:idNota/excluir (confirma exclusão de anotação existente). */
router.post("/:id/:idNota/excluir", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const file = fs.readFileSync("notesDB.json");
    let data = JSON.parse(file);
    const userNotes = data.findIndex((user) => {
        return user.id.localeCompare(userID) == 0;
    });
    console.log("começo");
    if (userNotes > -1) {
        console.log("nota");
        const noteIndex = data[userNotes].notas.findIndex(
            (nota) => nota.id.localeCompare(noteID) == 0
        );
        if (noteIndex > -1) {
            console.log("fim");
            data[userNotes].notas.splice(noteIndex, 1);
            fs.writeFileSync("notesDB.json", JSON.stringify(data));
        }
    }
    res.redirect("/u/" + userID);
});

module.exports = router;
