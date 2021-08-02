import express from 'express'
import ev from 'express-validator'
import { 
    addNote,
    updateNote,
    deleteNote
} from '../controllers/note.js'

const note = express.Router()

note.post(
    "/",
    [
        ev
            .check("content")
            .notEmpty(),
    ],
    addNote
)


note.put(
    "/",
    [
        ev
            .check("id")
            .notEmpty(),
        ev
            .check("content")
            .notEmpty()
    ],
    updateNote
)


note.delete(
    "/",
    [
        ev
            .check("id")
            .notEmpty(),  
    ],
    deleteNote
)

export default note