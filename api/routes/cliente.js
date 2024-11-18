
const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { isAdmin, isCliente, isEstabelecimento,  } = require("../middlewares/middleware");


// Rota: POST /login
router.post("/login", clienteController.login);

// Rota: GET /
router.get("/", isAdmin, clienteController.listarTodosClientes);

// Rota: GET /
router.get("/meus", isEstabelecimento, clienteController.listarMeusClientes);

// Rota: GET /:id
router.get("/:id", isCliente, clienteController.listarClientePorId);

// Rota: POST /
router.post("/", clienteController.criarCliente);

// Rota: PUT /:id
router.put("/:id", isCliente, clienteController.atualizarCliente);

// Rota: DELETE /:id
router.delete("/", isCliente, clienteController.deletarCliente);

module.exports = router;
