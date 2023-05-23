const express = require('express');

const router = express.Router();

const {
    isValidId,
    validateBody,
    adminCurrent
} = require('../../middlewares');

const { updateClientsSchema } = require('../../models/clientSchema');

const {
    listClients,
    getClientsById,
    addClient,
    updateClient,
    remove
} = require('../../controllers/clientControl');

router.get('/', adminCurrent, listClients);

router.get('/:id', isValidId, getClientsById);

router.post('/', adminCurrent, validateBody(updateClientsSchema), addClient);

router.put('/:id', isValidId, validateBody(updateClientsSchema), updateClient);

router.delete('/:id', isValidId, remove);

module.exports = router;