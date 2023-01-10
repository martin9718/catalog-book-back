const {DatabaseError} = require('../errors/errors');

class UsersStore {
    constructor(connection) {
        this.connection = connection;
    }

    async create(user) {
        try {
            return await this.connection.models.User.create(user);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findOne(params) {
        try {
            return await this.connection.models.User.findOne({...params});
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findById(id) {
        try {
            return await this.connection.models.User.findById(id);
        } catch (error) {
            throw new DatabaseError();
        }
    }
}

module.exports = {UsersStore};
