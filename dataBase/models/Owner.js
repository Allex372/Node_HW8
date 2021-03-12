const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const ownerScheme = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    yearBirthday: { type: Number, default: 2001 }
});

module.exports = model(constants.OWNER, ownerScheme);
