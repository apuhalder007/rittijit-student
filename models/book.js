const mongoose =  require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], 
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', Schema);
