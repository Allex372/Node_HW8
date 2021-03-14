const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const carSubScheme = {
    model: { type: String },
    price: { type: Number }
};

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    password: { type: String, required: true, select: false },
    email: { type: String },
    avatar: { type: String },
    // docs: { type: String },
    // video: { type: String },
    // _cars: [carSubScheme]
});

// userScheme.virtual('full_name').get(function() {
//     return `${this.name} ${this.password}`;
// });
//
// userScheme.virtual('userCars', {
//     ref: 'Car',
//     localField: 'cars',
//     foreignField: '_id'
// });
//
// userScheme.pre('find', function() {
//     this.populate('userCars');
// });

module.exports = model(constants.USER, userScheme);
