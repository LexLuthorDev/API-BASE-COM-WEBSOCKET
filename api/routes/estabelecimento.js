
const express = require("express");
const router = express.Router();
const estabelecimentoController = require("../controllers/estabelecimentoController");
const { isAdmin, isCliente, isEstabelecimento,  } = require("../middlewares/middleware");

// Rota: POST /login
router.post("/login", estabelecimentoController.login);

// Rota: GET /
router.get("/", isAdmin, estabelecimentoController.listarTodosEstabelecimentos);

// Rota: GET /:id
router.get("/:id", estabelecimentoController.listarEstabelecimentoPorId);

// Rota: POST /
router.post("/", estabelecimentoController.criarEstabelecimento);

// Rota: PUT /:id
router.put("/:id", isEstabelecimento, estabelecimentoController.atualizarEstabelecimento);

// Rota: DELETE /:id
router.delete("/", isEstabelecimento, estabelecimentoController.deletarEstabelecimento);

module.exports = router;
