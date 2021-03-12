const { User } = require('../dataBase/models');

module.exports = {
    findUser: (email) => User.findOne({ email })
};
