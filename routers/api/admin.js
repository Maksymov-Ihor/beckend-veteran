const express = require('express');

const router = express.Router();

const {
    validateBody,
    adminCurrent
} = require('../../middlewares');

const {
    joiRegisterSchema,
    joiLoginSchema
} = require('../../models/adminSchema');

const {
    signup,
    login,
    current,
    logout
} = require('../../controllers/adminControl');

router.post('/signup', validateBody(joiRegisterSchema), signup);

router.post('/login', validateBody(joiLoginSchema), login);

router.get('/current', adminCurrent, current);

router.get('/logout', adminCurrent, logout);

module.exports = router;