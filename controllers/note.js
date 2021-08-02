import ev from 'express-validator'
import { Note } from '../models/index.js'
import { generateId } from '../utils/index.js'

const addNote = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const note = await Note.create({
            id: generateId(),
            userId,
            content: data.content,
            background: data.background
        })
        if(note){
            return  res.success(note, "Note created successfully", 200)
        }
    }
    return res.success(errors, "Failed to create note", 500)
}

const updateNote = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const success = await Note.update({
            content: data.content,
            background: data.background
        }, {
            where: {
                userId,
                id: data.id
            }
        })
        if(success){
            return  res.success([], "Note updated successfully", 200)
        }
    }
    return res.success(errors, "Failed to create note", 500)
}

const deleteNote = async (req, res ) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req

        const success = await Note.destroy({
            where: {
                id: data.id
            }
        })
        if(success){
            return  res.success([], "Note deleted successfully", 200)
        }
    }
    return res.success(errors, "Failed to create note", 500)
}

export {
    addNote,
    updateNote,
    deleteNote
}