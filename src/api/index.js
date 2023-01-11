const express = require('express');
const {router} = require('./routes/index');
const fileUpload = require('express-fileupload');
const history = require("connect-history-api-fallback");
const path = require("path");

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

const imageMiddleware = image => (req, res, next) => {
    req.images = image;

    next();
}

const corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

    next();
}

const API = (database, passwords, serializers, session, image) => {
    const app = express();

    app.use(databaseMiddleware(database));
    app.use(passwordMiddleware(passwords));
    app.use(serializerMiddleware(serializers));
    app.use(sessionMiddleware(session));
    app.use(imageMiddleware(image));

    app.use(corsMiddleware);

    app.use(express.json());
    app.use(express.urlencoded({limit: "50mb", extended: true}));
    app.use(fileUpload({useTempFiles: true}));


    app.use('/api', router);

    app.use(history());

    app.use(express.static(path.resolve(__dirname, "../public")));

    return app;
}

module.exports = API;
