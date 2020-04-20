const express = require('express');
const Answer = require('../models/Answer');

const router = express.Router();

//Retrieve todos
router.get('/', async (req, res) => {
    try{
        const answers = await Answer.find();
        res.json(answers);
    } catch(err) {
        res.json({ message: err });
    }
    
})

//Create todo
router.post('/', async (req, res) => {
    const answer = new Answer({
        title: req.body.title,
        author: req.body.author,
        ownerQuestion: req.body.ownerQuestion
    })
    try {
        const savedQuestion = await answer.save();
        res.json(savedQuestion);
    } catch(err) {
        res.json({ message: err })
    }
})

//Specific ID
router.get('/:answerId', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.answerId);
        res.json(answer);
    } catch (err) {
        res.json({ message: err });
    }
})

//Delete
router.delete('/:answerId', async (req, res) => {
    try {
        const removedAnswer = await Answer.remove({_id: req.params.answerId});
        res.json(removedAnswer)
    } catch(err) {
        res.json({ message: err });
    }
})

//Update
router.patch('/:answerId', async (req, res) => {
    try {
        const updatedAnswer = await Answer.updateOne(
            { _id: req.params.answerId }, 
            { $set: { 
                title: req.body.title,
                }
            })
        res.json(updatedAnswer);
    } catch(err) {
        res.json({ message: err });
    }
})

module.exports = router;