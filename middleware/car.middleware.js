const { errorCodes } = require('../constant');
const { errorMessages } = require('../error');
const { findCarByID } = require('../service/car.service');

module.exports = {
    ifCarExists: async (req, res, next) => {
        try {
            const { language = 'ua' } = req.body;
            const { userId } = req.params;
            const foundUser = await findCarByID(+userId);
            if (!foundUser) {
                throw new Error(errorMessages.USER_NOT_FOUND[language]);
            }

            req.user = foundUser;

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { name, password, language = 'en' } = req.body;

            if (!name || !password) {
                throw new Error(errorMessages.SOME_FIELD_IS_EMPTY[language]);
            }

            if (password.length < 6) {
                throw new Error(errorMessages.TOO_SMALL_PASSWORD[language]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
