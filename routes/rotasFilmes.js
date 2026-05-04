const { Router } = require('express');

const { getFilme, addFilme, updateFilme, deleteFilme, getFilmePorId } = require('../controllers/filmeController');

const rotasFilmes = new Router();

rotasFilmes.route('/filme')
    .get(getFilme)
    .post(addFilme)
    .put(updateFilme)

rotasFilmes.route('/filme/:id')
    .get(getFilmePorId)
    .delete(deleteFilme)

module.exports = { rotasFilmes };