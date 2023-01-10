const {userSchema} = require('./models/user');
const {sessionSchema} = require('./models/session');

const {UsersStore} = require('./stores/usersStore');
const {SessionsStore} = require('./stores/sessionsStore');

class Database {
    constructor(connection) {
        this.connection = connection;

        this.connection.model('User', userSchema);
        this.connection.model('Session', sessionSchema);

        this.users = new UsersStore(this.connection);
        this.sessions = new SessionsStore(this.connection);
    }
}

module.exports = Database;
