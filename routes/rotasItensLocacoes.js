const { Router } = require('express');

const { getItemLocacao, addItemLocacao, updateItemLocacao, deleteItemLocacao, getItemLocacaoPorId } = require('../controllers/itemLocacaoController');

const rotasItensLocacoes = new Router();

rotasItensLocacoes.route('/itemlocacao')
    .get(getItemLocacao)
    .post(addItemLocacao)
    .put(updateItemLocacao)

rotasItensLocacoes.route('/itemlocacao/:id')
    .get(getItemLocacaoPorId)
    .delete(deleteItemLocacao)

module.exports = { rotasItensLocacoes };