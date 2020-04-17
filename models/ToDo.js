const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type:  String,
        required: false
    },
    remindMeOnDay: {
        type: Boolean,
        default: false
    },
    remindDate: {
        type: Date,
        required: false
    },
    priority: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDos', ToDoSchema);