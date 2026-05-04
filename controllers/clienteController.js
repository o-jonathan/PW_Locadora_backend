const { getClientesDB, addClienteDB, updateClienteDB, deleteClienteDB, getClientePorIdDB } = require('../usecases/clienteUseCases');

const getCliente = async (request, response) => {
    await getClientesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
}

const addCliente = async (request, response) => {
    await addClienteDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Cliente criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const updateCliente = async (request, response) => {
    await updateClienteDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Cliente atualizado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const deleteCliente = async (request, response) => {
    await deleteClienteDB(request.params.id)
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

const getClientePorId = async (request, response) => {
    await getClientePorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }))
}

module.exports = { getCliente, addCliente, updateCliente, deleteCliente, getClientePorId }