// ROTAS A PARTIR DE /U/ID, INDICANDO USUÁRIO LOGADO

const express = require("express");
const router = express.Router();

/* GET /u/:id (homepage, anotações e navegação). */
router.get("/:id", function (req, res, next) {
    res.render("verTodos", { title: "FlyApp" });
});
/* GET /u/:id/novo (form anotação nova). */
router.get("/:id/novo", function (req, res, next) {
    res.render("formNovo", { title: "FlyApp" });
});
/* POST /u/:id/novo (salva anotação nova). */
router.post("/:id/novo", function (req, res, next) {
    // res.render("index", { title: "FlyApp" });
});
/* GET /u/:id/:idNota (acessa anotação existente). */
router.get("/:id/:idNota", function (req, res, next) {
    res.render("verNota", { title: "FlyApp" });
});
/* GET /u/:id/:idNota/edit (form para editar anotação existente). */
router.get("/u/:id/:idNota/edit", function (req, res, next) {
    res.render("formEditar", { title: "FlyApp" });
});
/* POST /u/:id/:idNota/edit (salva alteração em anotação existente). */
router.post("/u/:id/:idNota/edit", function (req, res, next) {
    // res.render("index", { title: "FlyApp" });
});
/* GET /u/:id/:idNota/excluir (form para excluir anotação existente). */
router.get("/u/:id/:idNota/excluir", function (req, res, next) {
    res.render("formExcluir", { title: "FlyApp" });
});
/* POST /u/:id/:idNota/excluir (confirma exclusão de anotação existente). */
router.post("/u/:id/:idNota/excluir", function (req, res, next) {
    // res.render("index", { title: "FlyApp" });
});

module.exports = router;
