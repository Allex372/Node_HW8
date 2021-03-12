const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:id', carMiddleware.isCarValid, carController.getCarsById);

router.post('/', carMiddleware.ifCarExists, carController.createCars);

module.exports = router;
