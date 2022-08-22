const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid')


//GET Route for retriving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
})

//POST Route for appending notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        return fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const notes = JSON.parse(data);
                notes.push(newNote);

                fs.writeFile('db/db.json', JSON.stringify(notes), () => {
                    res.json(data);
                });
            }
        });

    }

    console.log(newNote);
})

module.exports = notes;