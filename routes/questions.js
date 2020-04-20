const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

//Retrieve todos
router.get('/', async (req, res) => {
    try{
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        res.json({ message: err });
    }
    
})

//Create todo
router.post('/', async (req, res) => {
    const question = new Question({
        title: req.body.title,
        author: req.body.author,
    })
    try {
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    } catch(err) {
        res.json({ message: err })
    }
})

//Specific ID
router.get('/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        res.json(question);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete
router.delete('/:questionId', async (req, res) => {
    try {
        const removedQuestion = await Question.remove({_id: req.params.questionId});
        res.json(removedQuestion)
    } catch(err) {
        res.json({ message: err });
    }
})

//Update
router.patch('/:questionId', async (req, res) => {
    try {
        const updatedQuestion = await Question.updateOne(
            { _id: req.params.questionId }, 
            { $set: { 
                title: req.body.title,
                }
            })
        res.json(updatedQuestion);
    } catch(err) {
        res.json({ message: err });
    }
})

module.exports = router;