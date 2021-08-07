import ev from 'express-validator'
import { createManyHandler, updateManyHandler } from '../services/layoutItemsService.js'



const createItems = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const items = await createManyHandler(data, userId)
        return res.success(items, "Items created successfully", 200)
    }
    return res.success(errors, "Failed create items", 500)
}

const updateItems = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const items = await updateManyHandler(data, userId)
        return res.success(items, "Items updated successfully", 200)
    }
    return res.success(errors, "Failed create items", 500)
}


export {
    createItems,
    updateItems
}