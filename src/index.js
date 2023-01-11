const API = require('./api/index');
const {getDatabase} = require('./api/database/factory');
const {Password} = require('./api/lib/auth/password');
const {Serializer} = require('./api/lib/serializers/serializer');
const {Session} = require('./api/lib/auth/session');
const {Image} = require('./api/lib/images/image');

require('dotenv').config();


const app = API(
    getDatabase(),
    Password,
    Serializer,
    Session,
    Image
);

app.listen(process.env.PORT, () => {
    console.log(`Book catalog app is running in port ${process.env.PORT}`)
});

