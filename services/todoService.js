import { Todo, TodoChecklist, TodoList, TodoLabels, TodoLabelsAssociation, TodoBoards, UserTodoBoards, Attachment } from '../models/index.js'
import { updateDefaultBackground } from '../services/settingsService.js'
import { generateId,getFileExtention } from '../utils/index.js'
import { upload } from './storage/services.js'

const create = async (data, userId) => {
    const { type, title, index, todoId, todoListId, description,startDate, dueDate, boardId, color } = data
    const id = generateId()
    switch(type){
        case "list":
            return await TodoList.create({
                id,
                boardId,
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
    const { boardId, userId, imageUrl: url, isDefault, file } = data

    let imageUrl = url

    if(file){
        console.log({
            file
        })
        const fileName = `${generateId()}.${getFileExtention(file.originalname)}`;
        imageUrl = await upload({
            name: fileName,
            folder: "backgroundImage"
        }, file)
    }

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
    return imageUrl
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

const createManyList = async (list, boardId) => {
    return await Promise.all(list.map(async item => {
        const listId = generateId()
        return await create({
            id: listId,
            boardId,
            title: item.title,
            index: item.index,
            type: "list"
        })
    }))
}


const initBoard = async (data, userId) => {
    try {
        const { title, todoList: list } = data
        const boardId = generateId()
        const board = await TodoBoards.create({
            id: boardId,
            title
        })
        const userTodoBoard = await UserTodoBoards.create({
            boardId,
            userId,
            isAdmin: 1
        })
        let todoList = []
        if(list && list.length > 0){
           todoList = await createManyList(list, boardId)
        }
        return {
            userTodoBoard,
            board,
            todoList,
        }
    } catch(err){
        console.log({
            err
        })
        return null
    }
}


const getUserBoards = async(userId) => {
    const todoBoards = await UserTodoBoards.findAll({
        where: { userId },
        attributes: [ "boardId", "isAdmin", "rule", "backgroundImage" ],
        include: [
            {
                model: TodoBoards,
                attributes: ["title"],
                include: [
                    {
                        model: TodoList,
                        include: {
                            model: Todo,
                            include: [
                                {
                                    model: TodoChecklist,
                                    as: "checkList"
                                },
                                {
                                    model: TodoLabels,
                                    as: "todoLabels",
                                    attributes: ['boardId', 'id']
                                },
                                {
                                    model: Attachment
                                }
                            ]
                        }
                    }
                ]
            },
            {
                model: TodoLabels,
                as: "labels"
            }
        ]
    })
    return todoBoards
}

const getUserBoard = async(userId, boardId) => {
    const todoBoard = await UserTodoBoards.findOne({
        where: { userId, boardId },
        attributes: [ "boardId", "isAdmin", "rule", "backgroundImage" ],
        include: [
            {
                model: TodoBoards,
                attributes: ["title"],
                include: [
                    {
                        model: TodoList,
                        include: {
                            model: Todo,
                            include: [
                                {
                                    model: TodoChecklist,
                                    as: "checkList"
                                },
                                {
                                    model: TodoLabels,
                                    as: "todoLabels",
                                    attributes: ['boardId', 'id']
                                },
                                {
                                    model: Attachment
                                }
                            ]
                        }
                    }
                ]
            },
            {
                model: TodoLabels,
                as: "labels"
            }
        ]
    })
    return todoBoard
}

export {
    create,
    updateOne,
    updateMany,
    deleteOne,
    setBoardBackgroundImage,
    todoAddLabel,
    todoRemoveLabel,
    createManyList,
    initBoard,
    getUserBoards,
    getUserBoard
}