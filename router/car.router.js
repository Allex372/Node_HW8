const router = require('express').Router();

const { carController } = require('../controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:id', carMiddleware.isCarValid, carController.getCarsById);

router.post('/', fileMiddleware.checkFile,
    // carMiddleware.ifCarExists,
    carController.createCars);

module.exports = router;
