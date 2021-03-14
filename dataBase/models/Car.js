const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const ownerSubScheme = {
    number: { type: Number, required: true }
};

const carScheme = new Schema({
    model: { type: String, required: true },
    year: { type: Number, default: 1999 },
    photos: { type: Array },
    docs: { type: Array },
    // _owner: [{ type: Schema.Types.ObjectId }]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

carScheme.virtual('full').get(function() {
    return `${this.model} ${this.year}`;
});

carScheme.virtual('carOwners', {
    ref: 'Owner',
    localField: 'owners',
    foreignField: '_id',
    justOne: true
});

carScheme.pre('find', function() {
    this.populate('carOwners');
});

module.exports = model(constants.CAR, carScheme);
