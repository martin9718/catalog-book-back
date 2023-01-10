const mongoose = require('mongoose');

const Database = require('./database')

const getConnectionDatabase = () => {
    let database;

    if (database) return database;

    database = mongoose.createConnection(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/test');

    return database;
}

const getDatabase = () => {
    return new Database(getConnectionDatabase());
}

module.exports = {getDatabase};
