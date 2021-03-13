const fs = require('fs-extra').promises;
const carService = require('../service/car.service');
const errorCodes = require('../constant/errorCodes.enum');
const { filePathBuider } = require('../helper');

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

    createCars: async (req, res, next) => {
        try {
            const { avatar, docs } = req;

            const createdCar = await carService.createCar(req.body);

            if (avatar) {
                // eslint-disable-next-line max-len
                const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(avatar.name, 'photos', createdCar._id);

                await fs.mkdir(fileDir, { recursive: true });

                await avatar.mv(finalFilePath);

                await carService.updateCar(createdCar._id, { avatar: uploadPath });
            }

            if (docs) {
                // eslint-disable-next-line max-len
                const { finalFilePath, uploadPath, fileDir } = filePathBuider.fileBuilderPath(docs.name, 'documents', createdCar._id);

                await fs.mkdir(fileDir, { recursive: true });

                await docs.mv(finalFilePath);

                await carService.updateCar(createdCar._id, { docs: uploadPath });
            }

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    },
};
