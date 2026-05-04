const { pool } = require('../config');
const Filme = require('../entities/filme');

const getFilmesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM filmes ORDER BY titulo');
        return rows.map((filme) => new Filme(filme.id, filme.titulo, filme.lancamento, filme.genero));
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

const addFilmeDB = async (body) => {
    try {
        const { titulo, lancamento, genero } = body;
        const results = await pool.query(`INSERT INTO filmes (titulo, lancamento, genero) VALUES ($1, $2, $3) RETURNING id, titulo, lancamento, genero`, [titulo, lancamento, genero]);
        const filme = results.rows[0];
        return new Filme(filme.id, filme.titulo, filme.lancamento, filme.genero);
    } catch (error) {
        throw '[ERRO!] Inserir filme: ' + error;
    }
}

const updateFilmeDB = async (body) => {
    try {
        const { id, titulo, lancamento, genero } = body;
        const results = await pool.query(`UPDATE filmes SET titulo = $1, lancamento = $2, genero = $3 WHERE id = $4`, [titulo, lancamento, genero, id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        }
        const filme = results.rows[0];
        return new Filme(filme.id, filme.titulo, filme.lancamento, filme.genero);
    } catch (error) {
        throw '[ERRO!] Atualizar filme: ' + error;
    }
}

const deleteFilmeDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM filmes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            return 'Filme removido com sucesso!'
        }
    } catch (error) {
        throw '[ERRO!] Remover filme: ' + error;
    }
}

const getFilmePorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM filmes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            const filme = results.rows[0];
            return new Filme(filme.id, filme.titulo, filme.lancamento, filme.genero);
        }
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

module.exports = { getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorIdDB };