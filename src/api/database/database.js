const {UsersStore} = require('./stores/usersStore');

const {userSchema} = require('./models/user')

class Database {
    constructor(connection) {
        this.connection = connection;

        this.connection.model('User', userSchema);

        this.users = new UsersStore(this.connection);
    }
}

module.exports = Database;
