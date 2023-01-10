const express = require('express');
const {router} = require('./routes/index');

const databaseMiddleware = database => (req, res, next) => {
    req.database = database;

    next();
}

const passwordMiddleware = passwords => (req, res, next) => {
    req.passwords = passwords;

    next();
}

const serializerMiddleware = serializers => (req, res, next) => {
    req.serializers = serializers;

    next();
}

const API = (database, passwords, serializers) => {
    const app = express();

    app.use(databaseMiddleware(database));
    app.use(passwordMiddleware(passwords));
    app.use(serializerMiddleware(serializers));

    app.use(express.json());

    app.use('/api', router);


    return app;
}

module.exports = API;
