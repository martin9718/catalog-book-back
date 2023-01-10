const API = require('./api/index');
const {getDatabase} = require('./api/database/factory');
const {Password} = require('./api/lib/auth/password');
const {Serializer} = require('./api/lib/serializers/serializer');


const app = API(
    getDatabase(),
    Password,
    Serializer
);

app.listen(3000, () => {
    console.log('Book catalog app is running in port 3000')
});
