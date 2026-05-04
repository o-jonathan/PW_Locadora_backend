const { getLocacoesDB, addLocacaoDB, updateLocacaoDB, deleteLocacaoDB, getLocacaoPorIdDB } = require('../usecases/locacaoUseCases');

const getLocacao = async (request, response) => {
    await getLocacoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
}

const addLocacao = async (request, response) => {
    await addLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Locação criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const updateLocacao = async (request, response) => {
    await updateLocacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Locação atualizada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const deleteLocacao = async (request, response) => {
    await deleteLocacaoDB(request.params.id)
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const getLocacaoPorId = async (request, response) => {
    await getLocacaoPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

module.exports = { getLocacao, addLocacao, updateLocacao, deleteLocacao, getLocacaoPorId }