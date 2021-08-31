import express from 'express'
import ev from 'express-validator'
import { 
    createHandler,
    updateHandler,
    deleteHandler,
    getUserNotes,
    synchroniseNotes
} from '../controllers/note.js'

const note = express.Router()

note.get(
    "/",
    [],
    getUserNotes
)

note.post(
    "/synchronise",
    [],
    synchroniseNotes
)

note.post(
    "/create/:type",
    [
        
        ev
            .check('type')
            .notEmpty()
            .isIn(['note', 'folder']),
        ev
            .check("index")
            .if((value, {req}) => {
                return req.params.type === "folder"
            })
            .notEmpty(),
        ev
            .check("content")
            .if((value, {req}) => {
                return req.params.type === "note"
            })
            .notEmpty(),
        ev
            .check("folderId")
            .if((value, {req}) => {
                return req.params.type === "note"
            })
            .notEmpty(),
        ev
            .check("title")
            .notEmpty()
    ],
    createHandler
)

note.put(
    "/update/:type",
    [
        ev
            .check('type')
            .notEmpty()
            .isIn(['note', 'folder'])
        ,
        ev
            .check("index")
            .notEmpty(),
        ev
            .check("id")
            .notEmpty(),
        ev
            .check("content")
            .if((value, {req}) => {
                return req.params.type === "note"
            })
            .notEmpty(),
        ev
            .check("folderId")
            .if((value, {req}) => {
                return req.params.type === "note"
            })
            .notEmpty(),
        ev
            .check("title")
            .if((value, {req}) => {
                return req.params.type === "folder"
            })
            .notEmpty()
    ],
    updateHandler
)

note.delete(
    "/delete/:type",
    [
        ev
            .check('type')
            .notEmpty()
            .isIn(['note', 'folder']),
        ev
            .check("id")
            .notEmpty(),  
    ],
    deleteHandler
)


export default note