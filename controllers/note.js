import ev from 'express-validator'
import { Note } from '../models/index.js'
import { generateId } from '../utils/index.js'
import {create, update, deleteOne, getNotesByUserId, synchronise } from '../services/noteService.js'
import { updateNoteSynchronisationDate } from '../services/userService.js'

const createHandler = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId, params: { type } } = req
        const item = await create(data, type, userId)
        if(item){
            return  res.success(item, `${type} created successfully`, 200)
        }
    }
    return res.success(errors, `Failed to create ${type}`, 500)
}

const updateHandler = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId, params: { type } } = req
        const item = await update(data, type, userId)
        if(item){
            return  res.success(item,  `${type} updated successfully`, 200)
        }
    }
    return res.success(errors, `Failed to updated ${type}`, 500)
}

const deleteHandler = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, params: { type } } = req
        const success = await deleteOne("note", data.id)
        if(success){
            return  res.success([], `${type} deleted successfully`, 200)
        }
    }
    return res.success(errors, `Failed to delete ${type}`, 500)
}

const getUserNotes = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { userId } = req
        const notes = await getNotesByUserId(userId)
        if(notes){
            return  res.success(notes,  `Got notes successfully`, 200)
        }
    }
    return res.success(errors, `Failed to get notes`, 500)
}

const synchroniseNotes = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const success = await synchronise(data, userId)
        await updateNoteSynchronisationDate(data.updatedAt, userId)
        if(success){
            return  res.success(success,  `Notes synchronized successfully`, 200)
        }
    }
    return res.success(errors, `Failed to synchonize notes`, 500)
}



export {
    createHandler,
    updateHandler,
    deleteHandler,
    getUserNotes,
    synchroniseNotes
}