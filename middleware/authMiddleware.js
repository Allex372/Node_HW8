const jwt = require('jsonwebtoken');
const { constants } = require('../constant');
const { errorMessages, ErrorHendler } = require('../error');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const { language = 'en' } = req.body;

            const access_token = req.get(constants.Authorization);

            if (!access_token) {
                res.json(errorMessages.TOKEN_REQUIRED[language]);
            }

            jwt.verify(access_token, 'JWT_ACCESS', (err) => {
                if (err) {
                    throw new ErrorHendler(errorMessages.NOT_VALID_TOKEN);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHendler(errorMessages.NOT_VALID_TOKEN);
            }
        } catch (e) {
            next(e);
        }
    },
};
