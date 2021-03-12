const router = require('express').Router();

const { authController } = require('../controller');

const { refresh_tokenController } = require('../controller');

router.post('/', authController.authController);

router.post('/refresh/:id', refresh_tokenController.findUser);

module.exports = router;
