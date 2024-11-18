
const express = require("express");
const router = express.Router();
const pagamentoController = require("../controllers/pagamentoController");

// Rota: POST /login
router.post("/login", pagamentoController.login);

// Rota: GET /
router.get("/", pagamentoController.listarTodosPagamentos);

// Rota: GET /:id
router.get("/:id", pagamentoController.listarPagamentoPorId);

// Rota: POST /
router.post("/", pagamentoController.criarPagamento);

// Rota: PUT /:id
router.put("/:id", pagamentoController.atualizarPagamento);

// Rota: DELETE /:id
router.delete("/:id", pagamentoController.deletarPagamento);

module.exports = router;
