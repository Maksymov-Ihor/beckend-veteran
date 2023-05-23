const { listClients } = require('./listClients');
const { getClientsById } = require('./getClientsById');
const { addClient } = require('./addClient');
const { updateClient } = require('./updateClient');
const { remove } = require('./remove');

module.exports = {
    listClients,
    getClientsById,
    addClient,
    updateClient,
    remove
}