const Owner = require('../dataBase/models/Owner');

module.exports = {
    findAllOwners: () => Owner.find(),

    findOwnerById: (ownerID) => Owner.findById(ownerID),

    createOwner: (ownerObject) => Owner.create(ownerObject)
};
