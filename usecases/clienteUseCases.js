const { pool } = require('../config');
const Cliente = require('../entities/cliente');

const getClientesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM clientes ORDER BY nome');
        return rows.map((cliente) => new Cliente(cliente.id, cliente.nome, cliente.email));
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

const addClienteDB = async (body) => {
    try {
        const { nome, email } = body;
        const results = await pool.query(`INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING id, nome, email`, [nome, email]);
        const cliente = results.rows[0];
        return new Cliente(cliente.id, cliente.nome, cliente.email);
    } catch (error) {
        throw '[ERRO!] Inserir cliente: ' + error;
    }
}

const updateClienteDB = async (body) => {
    try {
        const { id, nome, email } = body;
        const results = await pool.query(`UPDATE clientes SET nome = $1, email = $2 WHERE id = $3`, [nome, email, id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        }
        const cliente = results.rows[0];
        return new Cliente(cliente.id, cliente.nome, cliente.email);
    } catch (error) {
        throw '[ERRO!] Atualizar cliente: ' + error;
    }
}

const deleteClienteDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM clientes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            return 'Cliente removido com sucesso!'
        }
    } catch (error) {
        throw '[ERRO!] Remover cliente: ' + error;
    }
}

const getClientePorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            const cliente = results.rows[0];
            return new Cliente(cliente.id, cliente.nome, cliente.email);
        }
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

module.exports = { getClientesDB, addClienteDB, updateClienteDB, deleteClienteDB, getClientePorIdDB };