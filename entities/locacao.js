class Locacao {
    constructor(id, cliente_id, data_locacao, data_devolucao) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.data_locacao = data_locacao;
        this.data_devolucao = data_devolucao;
    }
}

module.exports = Locacao;