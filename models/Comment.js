const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9\s]+$/.test(v);
            }
        }
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Comment', commentSchema);
