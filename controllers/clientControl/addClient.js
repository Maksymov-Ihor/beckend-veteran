const { Client } = require('../../models/clientSchema');

const { ctrlWrapper } = require('../../helpers');

const addClient = async (req, res) => {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
}

module.exports = {
    addClient: ctrlWrapper(addClient)
}