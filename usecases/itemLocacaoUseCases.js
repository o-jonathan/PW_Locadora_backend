const { pool } = require('../config');
const ItemLocacao = require('../entities/itemLocacao');

const getItensLocacoesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM item_locacao ORDER BY filme_id');
        return rows.map((itemLocacao) => new ItemLocacao(itemLocacao.id, itemLocacao.locacao_id, itemLocacao.filme_id));
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

const addItemLocacaoDB = async (body) => {
    try {
        const { locacao_id, filme_id } = body;
        const results = await pool.query(`INSERT INTO item_locacao (locacao_id, filme_id) VALUES ($1, $2) RETURNING id, locacao_id, filme_id`, [locacao_id, filme_id]);
        const itemLocacao = results.rows[0];
        return new ItemLocacao(itemLocacao.id, itemLocacao.locacao_id, itemLocacao.filme_id);
    } catch (error) {
        throw '[ERRO!] Inserir item na locação: ' + error;
    }
}

const updateItemLocacaoDB = async (body) => {
    try {
        const { id, locacao_id, filme_id } = body;
        const results = await pool.query(`UPDATE item_locacao SET locacao_id = $1, filme_id = $2 WHERE id = $3`, [locacao_id, filme_id, id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        }
        const itemLocacao = results.rows[0];
        return new ItemLocacao(itemLocacao.id, itemLocacao.locacao_id, itemLocacao.filme_id);
    } catch (error) {
        throw '[ERRO!] Atualizar item da locação: ' + error;
    }
}

const deleteItemLocacaoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM item_locacao WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            return 'Item removido da locação com sucesso!'
        }
    } catch (error) {
        throw '[ERRO!] Remover item da locação: ' + error;
    }
}

const getItemLocacaoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM item_locacao WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            const itemLocacao = results.rows[0];
            return new ItemLocacao(itemLocacao.id, itemLocacao.locacao_id, itemLocacao.filme_id);
        }
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

module.exports = { getItensLocacoesDB, addItemLocacaoDB, updateItemLocacaoDB, deleteItemLocacaoDB, getItemLocacaoPorIdDB };