const { User } = require('../dataBase/models');
const { userValidators } = require('../validators');
const { errorMessages, ErrorHendler } = require('../error');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailCreated: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                throw new ErrorHendler(errorMessages.EMAIL_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginExisted: async (req, res, next) => {
        try {
            const { name } = req.body;

            const user = await User.findOne({ name });

            if (user) {
                throw new ErrorHendler(`Name: ${name} already exist`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
