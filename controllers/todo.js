import ev from 'express-validator'
import { User, Todo, TodoList } from '../models/index.js'
import { generateId, isArray } from '../utils/index.js'
import { create, updateOne, updateMany, deleteOne } from '../services/todoService.js'


const createHandler = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : data, userId } = req
        const responseData =  await create(data, userId)
        return res.success(responseData, `${data.type.toUpperCase()} created successfully`, 200)
    }
    return res.error(errors, `Creating failed`, 500)
}


const updateHandler = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : data } = req
        const success = isArray(data) ? await updateMany(data) : await updateOne(data)
        if(success){
            return res.success([], `Update successfull`, 200)
        }
    }
    return res.error(errors, 'Updating todo list failed', 500)
}

const deleteHandler = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : data } = req
        const success = deleteOne(data)
        if(success){
            return res.success([], `Deleted successfully`, 200)
        }
    }
    return res.error(errors, 'Deleting todo list failed', 500)
}

export {
    createHandler,
    updateHandler,
    deleteHandler
}

