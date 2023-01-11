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

    async findById(id) {
        try {
            return await this.connection.models.Book.findById(id);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async findAllByUserId(userId, limit, page) {
        try {
            return await this.connection.models.Book.find({userId, active: true})
                .limit(limit * 1)
                .skip((page - 1) * limit);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async countBooks() {
        try {
            return await this.connection.models.Book.countDocuments({active: true});
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async updateBook(id, book) {
        try {
            return await this.connection.models.Book.updateOne({_id: id}, book);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async delete(id) {
        try {
            return await this.connection.models.Book.updateOne({_id: id}, {active: false});
        } catch (error) {
            throw new DatabaseError();
        }
    }
}

module.exports = {BooksStore};
