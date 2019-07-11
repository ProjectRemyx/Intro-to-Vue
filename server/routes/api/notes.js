const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Notes
router.get('/', async (req, res) =>{
    const notes = await loadNotesCollection();
    res.send(await notes.find({}).toArray());
});

//Add Notes
router.post('/', async (req, res) => {
    const notes = await loadNotesCollection();
    await notes.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Notes
router.delete('/:id', async (req, res) => {
    const notes = await loadNotesCollection();
    await notes.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

async function loadNotesCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jingkcheng:qwe123@cluster0-f63th.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Vue_Notes').collection('notes');
}

module.exports = router;