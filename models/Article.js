const mongoose = require("mongoose");

const AprticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9\s]+$/.test(v);
            }, 
            message:'Please enter a valid title'
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9\s]+$/.test(v);
            }
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', AprticleSchema);