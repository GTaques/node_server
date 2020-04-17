const express = require('express');
const ToDo = require('../models/ToDo');

const router = express.Router();

//Retrieve todos
router.get('/', async (req, res) => {
    try{
        const todos = await ToDo.find();
        res.json(todos);
    } catch(err) {
        res.json({ message: err });
    }
    
})

//Create todo
router.post('/', async (req, res) => {
    const todo = new ToDo({
        title: req.body.title,
        priority: req.body.priority
    })
    try {
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch(err) {
        res.json({ message: err })
    }
})

//Specific ID
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await ToDo.findById(req.params.todoId);
        res.json(todo);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete
router.delete('/:todoId', async (req, res) => {
    try {
        const removedToDo = await ToDo.remove({_id: req.params.todoId});
        res.json(removedToDo)
    } catch(err) {
        res.json({ message: err });
    }
})

//Update
router.patch('/:todoId', async (req, res) => {
    try {
        const updatedTodo = await ToDo.updateOne(
            { _id: req.params.postId }, 
            { $set: { 
                title: req.body.title,
                priority: req.body.priority
                }
            })
        res.json(updatedTodo);
    } catch(err) {
        res.json({ message: err });
    }
})

module.exports = router;