const {userSchema} = require('./models/user');
const {sessionSchema} = require('./models/session');
const {bookSchema} = require('./models/book');

const {UsersStore} = require('./stores/usersStore');
const {SessionsStore} = require('./stores/sessionsStore');
const {BooksStore} = require('./stores/booksStore');

class Database {
    constructor(connection) {
        this.connection = connection;

        this.connection.model('User', userSchema);
        this.connection.model('Session', sessionSchema);
        this.connection.model('Book', bookSchema);

        this.users = new UsersStore(this.connection);
        this.sessions = new SessionsStore(this.connection);
        this.books = new BooksStore(this.connection);
    }
}

module.exports = Database;
