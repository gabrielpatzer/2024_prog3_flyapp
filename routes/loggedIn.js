// ROTAS A PARTIR DE /U/ID, INDICANDO USUÁRIO LOGADO
const Notes = require("../model/json/note");
const express = require("express");
const router = express.Router();

/* GET /u/:id (homepage, anotações e navegação). */
router.get("/:id", function (req, res, next) {
    const userID = req.params.id;
    const userNotes = Notes.buscaNotasUsuario(userID);
    res.render("verTodos", {
        title: "FlyApp",
        notas: userNotes,
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
    const nova = new Notes(req.body.titulo, req.body.mensagem, userID);
    nova.salvar();
    res.redirect("/u/" + userID);
});
/* GET /u/:id/:idNota (acessa anotação existente). */
router.get("/:id/:idNota", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const nota = Notes.buscaNota(noteID);
    if (nota) {
        res.render("verNota", {
            title: "FlyApp",
            userID: userID,
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
    const nota = Notes.buscaNota(noteID);
    if (nota) {
        res.render("formEditar", {
            title: "FlyApp",
            userID: userID,
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
    const nota = Notes.buscaNota(noteID);
    nota.titulo = req.body.titulo;
    nota.mensagem = req.body.mensagem;
    nota.salvar();
    res.redirect("/u/" + userID);
});
/* GET /u/:id/:idNota/excluir (form para excluir anotação existente). */
router.get("/:id/:idNota/excluir", function (req, res, next) {
    const userID = req.params.id;
    const noteID = req.params.idNota;
    const nota = Notes.buscaNota(noteID);
    if (nota) {
        res.render("formExcluir", {
            title: "FlyApp",
            userID: userID,
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
    Notes.excluir(noteID);
    res.redirect("/u/" + userID);
});

module.exports = router;
