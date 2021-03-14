const Car = require('../dataBase/models/Car');

module.exports = {
    findAllCars: () => Car.find(),

    findCarByID: (carId) => (Car.findById(carId)),

    createCar: (carObj) => Car.create(carObj),

    updateCar: (carId, carObject) => {
        carObject.photos.forEach((el) => {
            Car.updateOne({ _id: carId }, { $set: el });
        });
        // Car.updateOne({ _id: carId }, { $set: carObject });
        // console.log(carObject.photos)
    }

};
