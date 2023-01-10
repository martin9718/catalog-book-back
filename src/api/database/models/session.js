const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

module.exports = {sessionSchema}
