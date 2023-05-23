const jwt = require('jsonwebtoken');

const { Admin } = require('../models/adminSchema');

const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const adminCurrent = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    try {
        if (bearer !== 'Bearer') {
            throw HttpError(401, 'Not authrized token1');
        }
        const { id } = jwt.verify(token, SECRET_KEY);

        const user = await Admin.findById(id);

        if (!user || !user.token) {
            throw HttpError(401, 'Not authrized token2');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            error.status = 401;
        }
        throw error;
    }
}

module.exports = adminCurrent;