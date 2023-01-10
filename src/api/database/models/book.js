const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    numberPages: {
        type: Number,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});

module.exports = {bookSchema}
