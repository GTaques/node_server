const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    ownerQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Answers', AnswerSchema);