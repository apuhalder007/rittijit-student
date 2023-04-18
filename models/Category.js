const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', Schema);