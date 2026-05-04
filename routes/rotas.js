const { Router } = require('express');
const { rotasClientes } = require('./rotasClientes');
const { rotasFilmes } = require('./rotasFilmes');
const { rotasItensLocacoes } = require('./rotasItensLocacoes');
const { rotasLocacoes } = require('./rotasLocacoes');

const rotas = new Router();

rotas.use(rotasClientes);
rotas.use(rotasFilmes);
rotas.use(rotasItensLocacoes);
rotas.use(rotasLocacoes);

module.exports = rotas;