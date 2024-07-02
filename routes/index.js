const express = require("express");
const router = express.Router();

/* GET home page (login form). */
router.get("/", function (req, res, next) {
    res.render("index", { title: "FlyApp" });
});
/* GET /cad (cadastro form). */
router.get("/", function (req, res, next) {
    res.render("formCadastro", { title: "FlyApp" });
});
/* POST / (tenta login). */
router.post("/", function (req, res, next) {
    // res.render("index", { title: "FlyApp" });
});
/* POST /cad (tenta cadastro). */
router.post("/", function (req, res, next) {
    // res.render("index", { title: "FlyApp" });
});

module.exports = router;
