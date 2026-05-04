const { Router } = require('express');

const { getCliente, addCliente, updateCliente, deleteCliente, getClientePorId } = require('../controllers/clienteController');

const rotasClientes = new Router();

rotasClientes.route('/cliente')
    .get(getCliente)
    .post(addCliente)
    .put(updateCliente)

rotasClientes.route('/cliente/:id')
    .get(getClientePorId)
    .delete(deleteCliente)

module.exports = { rotasClientes };