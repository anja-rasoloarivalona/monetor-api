import { Message } from '../models/index.js'
import { generateId } from '../utils/index.js'

const create = async data => {
    return await Message.create({
        id: generateId(),
        associationId: data.associationId,
        content: data.content,
        fromId: data.fromId,
        toId: data.toId
    })
}

const getMessages = async associationId => {
    return await Message.findAll({
        where: {
            associationId
        }
    })
}

export {
    create,
    getMessages
}