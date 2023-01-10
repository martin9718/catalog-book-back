const {DatabaseError} = require('../errors/errors');

class BooksStore {
    constructor(connection) {
        this.connection = connection;
    }

    async create(book) {
        try {
            return await this.connection.models.Book.create(book);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findOne(params) {
        try {
            return await this.connection.models.Book.findOne({...params});
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findById(id) {
        try {
            return await this.connection.models.Book.findById(id);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findAllByUserId(userId) {
        try {
            return await this.connection.models.Book.findOne({userId});
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async delete(params) {
        try {
            return await this.connection.models.Book.deleteOne({...params});
        } catch (error) {
            throw new DatabaseError();
        }
    }
}

module.exports = {BooksStore};
