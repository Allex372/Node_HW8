const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { config } = require('./config');

const apiRouter = require('./router/api.router');

const app = express();

_conectDB();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.use(express.static(path.join(process.cwd(), 'static')));

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(config.PORT, () => {
    console.log(`App ${config.PORT} in progress`);
});

function _conectDB() {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}
