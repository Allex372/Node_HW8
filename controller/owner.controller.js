const ownerService = require('../service/owner.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    findAll: async (req, res) => {
        try {
            const all = await ownerService.findAllOwners();
            res.json(all);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    findById: async (req, res) => {
        try {
            const ownerID = req.params.id;
            const owner = await ownerService.findOwnerById(ownerID);
            res.json(owner);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createOw: async (req, res) => {
        try {
            await ownerService.createOwner(req.body);
            res.json('Owner Created');
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
