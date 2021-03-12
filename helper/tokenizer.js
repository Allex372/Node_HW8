const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = () => {
    const access_token = jwt.sign({}, config.JWT_ACCESS, { expiresIn: '20s' });
    const refresh_token = jwt.sign({}, config.JWT_REFRESH, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
