const { getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorIdDB } = require('../usecases/filmeUseCases');

const getFilme = async (request, response) => {
    await getFilmesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
}

const addFilme = async (request, response) => {
    await addFilmeDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Filme criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const updateFilme = async (request, response) => {
    await updateFilmeDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Filme atualizado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const deleteFilme = async (request, response) => {
    await deleteFilmeDB(request.params.id)
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const getFilmePorId = async (request, response) => {
    await getFilmePorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

module.exports = { getFilme, addFilme, updateFilme, deleteFilme, getFilmePorId }