const express = require('express');
const ToDo = require('../models/ToDo');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("We're on todos!");
})

router.post('/', (req, res) => {
    const todo = new ToDo({
        title: req.body.title,
        priority: req.body.priority
    })
    todo.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json({ message: error });
        })
})

module.exports = router;