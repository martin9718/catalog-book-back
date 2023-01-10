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

const sessionMiddleware = session => (req, res, next) => {
    req.session = session;

    next();
}

const API = (database, passwords, serializers, session) => {
    const app = express();

    app.use(databaseMiddleware(database));
    app.use(passwordMiddleware(passwords));
    app.use(serializerMiddleware(serializers));
    app.use(sessionMiddleware(session));

    app.use(express.json());

    app.use('/api', router);


    return app;
}

module.exports = API;
