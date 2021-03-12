const Car = require('../dataBase/models/Car');

module.exports = {
    findAllCars: () => Car.find(),

    findCarByID: (carId) => (Car.findById(carId)),

    createCar: (carObj) => Car.create(carObj)
};
