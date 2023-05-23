const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin } = require('../../models/adminSchema');

const {
    ctrlWrapper,
    HttpError
} = require('../../helpers');

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const candidate = await Admin.findOne({ email });
    if (candidate) {
        throw HttpError(409, `User with ${email} alredy exist`);
    }

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = new Admin({ name, email, password: hashPass });

    const payload = {
        id: user._id    
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    await Admin.create({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token
    });

    res.status(201).json({
        status: 'seccess',
        token,
        user: {
            name,
            email,
        }
    });
}

module.exports = {
    signup: ctrlWrapper(signup)
}