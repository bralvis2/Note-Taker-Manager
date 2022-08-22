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
    // console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        // reads the file and adds a new note at the end of the db
        return fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const notes = JSON.parse(data);
                notes.push(newNote);

                // adds the note as a string
                fs.writeFile('db/db.json', JSON.stringify(notes), () => {
                    res.json(data);
                });
            }
        });

    }

    console.log(newNote);
});

// DELETE Route for deleting notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);
     const noteID = req.params.id;
     
     // read the file and fileters for note's id
     return fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            const deleteNote = notes.filter(note => noteID !==note.id);
            
            // deletes the note by removing the note selected
            fs.writeFile('db/db.json', JSON.stringify(deleteNote), () => {
                res.json(data);
            });
        }
     });
})

module.exports = notes;