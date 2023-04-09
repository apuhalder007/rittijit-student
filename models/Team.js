const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    homeStadium: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', Schema);