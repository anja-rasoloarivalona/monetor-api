import { Todo, TodoChecklist, TodoList } from '../models/index.js'
import { generateId } from '../utils/index.js'

const create = async (data, userId) => {
    const { type, title, index, todoId, todoListId, description,startDate, dueDate, labels } = data
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
            return await Todo.create({
                id,
                title,
                index,
                todoListId,
                labels,
                description,
                dueDate,
                startDate
        })
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
        default: break;
    }
}

const updateMany = async data => {
    // manage batch updates
    return await Promise.all(data.map(async item => updateOne(item)))
}

const updateOne = async data => {
    // update on item

    const { type, id, title, index,   todoId, todoListId, description,startDate, dueDate, labels, completedAt } = data

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
                    labels,
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
        case "checkList": {
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
        }
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
    }
}


export {
    create,
    updateOne,
    updateMany,
    deleteOne
}