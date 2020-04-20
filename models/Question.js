const mongoose = require('mongoose');
const Answer = require('../models/Answer');

const QuestionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: 'Anonymous'
    },
    answers: {
        type: [Answer],
        required: false,
        default: []
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.models('Questions', QuestionSchema);