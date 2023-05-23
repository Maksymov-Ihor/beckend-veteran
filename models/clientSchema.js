const { Schema, model } = require('mongoose');
const Joi = require('joi');

const clientSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for client'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Set phone for client'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
    }
}, { versionKey: false });

const updateClientsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const Client = model('client', clientSchema);

module.exports = {
    Client,
    updateClientsSchema
};