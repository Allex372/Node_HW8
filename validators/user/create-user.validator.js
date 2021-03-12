const Joi = require('joi');

const { regex, constants } = require('../../constant');

const carsSubScheme = Joi.array().items(
    Joi.object({
        model: Joi.string().alphanum().max(20),
        price: Joi.number().positive()
    })
);

module.exports = Joi.object({
    name: Joi.string().alphanum().min(3).max(50)
        .allow('SexyMax@#$%?^-^'),
    email: Joi.string().regex(regex.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regex.PASSWORD_REGEXP).required(),
    yearOfBorn: Joi.string().min(constants.DATA_OF_YEAR - 100).max(constants.DATA_OF_YEAR),
    age: Joi.number().positive().min(16).max(19),
    cars: carsSubScheme.when('age', { is: 18, then: Joi.required() })
});
