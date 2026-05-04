const { getItensLocacoesDB, addItemLocacaoDB, updateItemLocacaoDB, deleteItemLocacaoDB, getItemLocacaoPorIdDB } = require('../usecases/itemLocacaoUseCases');

const getItemLocacao = async (request, response) => {
    await getItensLocacoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
}

const addItemLocacao = async (request, response) => {
    await addLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Item da Locação criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const updateItemLocacao = async (request, response) => {
    await updateItemLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Item da Locação atualizado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const deleteItemLocacao = async (request, response) => {
    await deleteItemLocacaoDB(request.params.id)
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const getItemLocacaoPorId = async (request, response) => {
    await getLocacaoPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

module.exports = { getItemLocacao, addItemLocacao, updateItemLocacao, deleteItemLocacao, getItemLocacaoPorId }