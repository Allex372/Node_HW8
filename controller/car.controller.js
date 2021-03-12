const carService = require('../service/car.service');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const allCars = await carService.findAllCars();
            res.json(allCars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getCarsById: async (req, res) => {
        try {
            const carId = req.params.id;
            const finderCar = await carService.findCarByID(carId);

            res.json(finderCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCars: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.json('Car Created');
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e);
        }
    },
};
