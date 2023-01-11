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
    image:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = {bookSchema}
