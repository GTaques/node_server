const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDos', ToDoSchema);