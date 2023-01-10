const {DatabaseError} = require('../errors/errors');

class SessionsStore {
    constructor(connection) {
        this.connection = connection;
    }

    async create(session) {
        try {
            return await this.connection.models.Session.create(session);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findOne(params) {
        try {
            return this.connection.models.Session.findOne({...params});
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async delete(params) {
        try {
            return this.connection.models.Session.deleteOne({...params});
        } catch (error) {
            throw new DatabaseError();
        }
    }
}

module.exports = {SessionsStore};
