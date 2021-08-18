import { Todo, TodoChecklist, TodoList, TodoLabels, TodoLabelsAssociation, UserTodoBoards } from '../models/index.js'
import { updateDefaultBackground } from '../services/settingsService.js'
import { generateId } from '../utils/index.js'

const create = async (data, userId) => {
    const { type, title, index, todoId, todoListId, description,startDate, dueDate, boardId, color } = data
    const id = generateId()
    switch(type){
        case "list":
            return await TodoList.create({
                id,
                userId,
                title,
                index,
        })
        case "todo":
            const payload = {
                id,
                title,
                index,
                description,
                dueDate,
                startDate
            }
            if(todoListId){
                payload.todoListId = todoListId
            } else {
                payload.userId = userId
            }
            return await Todo.create(payload)
        case "checkList":
            return await TodoChecklist.create({
                id,
                title,
                index,
                todoId,
                description,
                dueDate,
                startDate
        })
        case "label": 
            return await TodoLabels.create({
                id,
                boardId,
                title,
                color
            })
        default: break;
    }
}

const updateMany = async data => {
    // manage batch updates
    return await Promise.all(data.map(async item => updateOne(item)))
}

const updateOne = async data => {

    const { type, id, title, index,   todoId, todoListId, description,startDate, dueDate, completedAt, color } = data

    switch(type){
        case "list":
            return await TodoList.update(
                {
                    title,
                    index
                },
                {
                    where: {
                        id
                    }
                }
            )
        case "todo":
            return await Todo.update(
                {
                    title,
                    index,
                    todoListId,
                    description,
                    dueDate,
                    startDate,
                    completedAt
                },
                {
                    where: {
                        id
                    }
                },
            )
        case "checkList": 
            return await TodoChecklist.upsert(
                {
                    id: id || generateId(),
                    title,
                    index,
                    todoId,
                    description,
                    dueDate,
                    startDate,
                    completedAt
                }
            )
        case "label":
            return await TodoLabels.update({
                tilte: title,
                color: color
            },
                {
                    where: {
                        id
                    }
                }
            )
        default: break;
    }
}

const deleteOne = async data => {
    const { type, id } = data
    switch(type){
        case "list":
            return await TodoList.destroy({
                where: { id }
            })
        case "todo":
            return await Todo.destroy({
                where: { id }
            })
        case "checkList":
            return await TodoChecklist.destroy({
                where: { id }
            })
        case "label": 
            return await TodoLabels.destroy({
                where: {
                    id
                }
            })
        default: break;
        
    }
}

const setBoardBackgroundImage = async data => {
    const { boardId, userId, imageUrl, isDefault } = data
    let success = await UserTodoBoards.update({
        backgroundImage: imageUrl
    }, {
        where: {
            boardId,
            userId
        }
    })
    if(success && isDefault){
        success = await updateDefaultBackground({
            imageUrl,
            userId
        })
    }
    return success
}

const todoAddLabel = async data => {
    const { todoId, labelId } = data
    return await TodoLabelsAssociation.create({
        todoId,
        labelId
    })
}

const todoRemoveLabel = async data=> {
    const { todoId, labelId } = data
    return await TodoLabelsAssociation.destroy({
        where: {
            todoId,
            labelId
        }
    })
}

export {
    create,
    updateOne,
    updateMany,
    deleteOne,
    setBoardBackgroundImage,
    todoAddLabel,
    todoRemoveLabel
}