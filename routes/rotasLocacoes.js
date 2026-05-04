const { Router } = require('express');

const { getLocacao, addLocacao, updateLocacao, deleteLocacao, getLocacaoPorId } = require('../controllers/locacaoController');

const rotasLocacoes = new Router();

rotasLocacoes.route('/locacao')
    .get(getLocacao)
    .post(addLocacao)
    .put(updateLocacao)

rotasLocacoes.route('/locacao/:id')
    .get(getLocacaoPorId)
    .delete(deleteLocacao)

module.exports = { rotasLocacoes };