import ev from 'express-validator'
import { User, Todo, TodoList, UserTodoBoards } from '../models/index.js'
import { generateId, isArray } from '../utils/index.js'
import { create, updateOne, updateMany, deleteOne, setBoardBackgroundImage, todoAddLabel, todoRemoveLabel, initBoard, getUserBoard, getUserBoards } from '../services/todoService.js'
import { createAttachment } from '../services/attachmentService.js'


const getUserBoardsHandler = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { userId } = req
        const todoBoards =  await getUserBoards(userId)
        return res.success(todoBoards, `User todo boards fetched successfully`, 200)
    }
    return res.error(errors, `Faield to get user boards`, 500)
}

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
        const success = await deleteOne(data)
        if(success){
            return res.success([], `Deleted successfully`, 200)
        }
    }
    return res.error(errors, 'Deleting todo list failed', 500)
}

const updateBoardBackground = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : { boardId, imageUrl, isDefault}, userId, file } = req
        const uploadedImageUrl = await  setBoardBackgroundImage({
            boardId,
            imageUrl,
            isDefault,
            userId,
            file
        })
        console.log({
            uploadedImageUrl
        })
        if(uploadedImageUrl){
            return res.success(uploadedImageUrl, `Background updated successfully`, 200)
        }
    }
    return res.error(errors, 'Updating background failed', 500)
}

const addLabel = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data } = req
        const added = await todoAddLabel(data)
        if(added){
            return res.success([], `Label added to  todo successfully`, 200)
        }
    }
    return res.error(errors, 'Failed to add todo label', 500)
}

const removeLabel = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data } = req
        const success = await todoRemoveLabel(data)
        if(success){
            return res.success([], 'Label removed from todo successfully', 200)
        }
    }
    return res.error(errors, 'Failed to remove todo label', 500)
}

const addAttachment = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, file } = req
        const attachment = await createAttachment({
            ...data,
            file,
            ownerType: 'todo'
        })
        if(attachment){
            return res.success(attachment, 'Attachment created successfully', 200)
        }
    }
    return res.error(errors, 'Failed add attachment', 500)
}

const initBoardHandler = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const newBoard = await initBoard(data, userId)
        if(newBoard){
            const boardId = newBoard.board.id
            const sanitized = await getUserBoard(userId, boardId)
            return res.success(sanitized, 'TodoBoard created successfully', 200)
        }
    }
    return res.error(errors, 'Failed to create todoboard', 500)
}

export {
    createHandler,
    updateHandler,
    deleteHandler,
    updateBoardBackground,
    addLabel,
    removeLabel,
    addAttachment,
    initBoardHandler,
    getUserBoardsHandler
}

