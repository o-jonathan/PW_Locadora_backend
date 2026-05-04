const { pool } = require('../config');
const Locacao = require('../entities/locacao');

const getLocacoesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM locacoes ORDER BY data_locacao DESC');
        return rows.map((locacao) => new Locacao(locacao.id, locacao.cliente_id, locacao.data_locacao, locacao.data_devolucao));
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

const addLocacaoDB = async (body) => {
    try {
        const { cliente_id, data_locacao, data_devolucao } = body;
        const results = await pool.query(`INSERT INTO locacoes (cliente_id, data_locacao, data_devolucao) VALUES ($1, $2, $3) RETURNING id, cliente_id, data_locacao, data_devolucao`, [cliente_id, data_locacao, data_devolucao]);
        const locacao = results.rows[0];
        return new Locacao(locacao.id, locacao.cliente_id, locacao.data_locacao, locacao.data_devolucao);
    } catch (error) {
        throw '[ERRO!] Inserir locação: ' + error;
    }
}

const updateLocacaoDB = async (body) => {
    try {
        const { id, cliente_id, data_locacao, data_devolucao } = body;
        const results = await pool.query(`UPDATE locacoes SET cliente_id = $1, data_locacao = $2, data_devolucao = $3 WHERE id = $4`, [cliente_id, data_locacao, data_devolucao, id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        }
        const locacao = results.rows[0];
        return new Locacao(locacao.id, locacao.cliente_id, locacao.data_locacao, locacao.data_devolucao);
    } catch (error) {
        throw '[ERRO!] Atualizar locação: ' + error;
    }
}

const deleteLocacaoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM locacoes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            return 'Locação removida com sucesso!'
        }
    } catch (error) {
        throw '[ERRO!] Remover locação: ' + error;
    }
}

const getLocacaoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM locacoes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            const locacao = results.rows[0];
            return new Locacao(locacao.id, locacao.cliente_id, locacao.data_locacao, locacao.data_devolucao);
        }
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

module.exports = { getLocacoesDB, addLocacaoDB, updateLocacaoDB, deleteLocacaoDB, getLocacaoPorIdDB };