const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    findUserById: (userId) => (User.findById(userId)),

    createUser: (userObject) => User.create(userObject),

    updateUser: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    deleteSingleUser: (userId) => User.findByIdAndDelete(userId)
};
