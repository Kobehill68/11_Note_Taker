const router = require("express").Router();
const noteData = require("../data/note")
const fs = require("fs");
const path = require("path");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "../../db/db.json");

router
    .route("/notes/:id")
    .delete((req, res) => {
        const id = req.params.id;
        fs.readFile(outputPath, (error, data) => {
            error ? console.error(error) : console.log("Success!");
            const notes = JSON.parse(data);
            const intId = parseInt(id)
            const findIndex = notes.findIndex(element => {
                return (element.id === intId);
            })
            notes.splice(findIndex, 1);
            fs.writeFileSync(outputPath, JSON.stringify(notes));
            const mNotes = fs.readFileSync(outputPath);
            const readNotes = JSON.parse(mNotes);
            res.json(readNotes);

        });
    });

router
    .route("/notes")
    .get((__req, res) => {
        fs.readFile(outputPath, (error, data) => {
            if (error) {
                console.error(error)
            }
            const notes = JSON.parse(data);
            res.json(notes)
        })
    })
    .post((req, res) => {
        const newNote = req.body;
        const rNewNote = noteData;
        const notes = JSON.parse(fs.readFileSync(outputPath));
        const lastelement = notes.length > 0 ? notes[notes.length - 1] : noteData

        const lastElementIndex = lastelement.id + 1;

        rNewNote.id = lastElementIndex;
        rNewNote.title = newNote.title;
        rNewNote.text = newNote.text;

        notes.push(rNewNote);

        fs.writeFile(outputPath, JSON.stringify(notes), (err) => {
            err ? console.error(err) : res.json(rNewNote);
        })
    })


module.exports = router;