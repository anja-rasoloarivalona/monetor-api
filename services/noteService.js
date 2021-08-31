import { Note, NotesFolder } from '../models/index.js'
import { generateId } from '../utils/index.js'

const create = async (data, type, userId) => {
    if(type === "note"){
        return await Note.create({
            id: generateId(),
            userId: data.folderId ? null : userId,
            content: data.content,
            title: data.title,
            background: data.background,
            folderId: data.folderId,
        })
    }
    if(type === "folder"){
        return await NotesFolder.create({
            id: generateId(),
            title: data.title,
            userId,
            index: data.index,
            parentId: data.parentId
        })
    }
}

const update = async(data, type, userId) => {
    if(type === "note"){
        return await Note.update({
            title: data.title,
            content: data.content,
            background: data.background,
            folderId: data.folderId,
        }, {
            where: {
                id: data.id
            }
        })
    }
    if(type === "folder"){
        return await NotesFolder.create({
            title: data.title,
            index: data.index,
            parentId: data.parentId
        }, {
            where: {
                id: data.id
            }
        })
    }
}

const deleteOne = async(type, id) => {
    if(type === "note"){
        return await Note.destroy({
            where: { id }
        })
    }
    if(type === "folder"){
        return await NotesFolder.destroy({
            where: { id }
        })
    }
}

const getNotesByUserId = async userId => {
    return await NotesFolder.findAll({
        where: { userId },
        include: [
            {
                model: Note,
            }
        ]
    })
}

const synchronise = async (data, userId) => {
    const { add, update, delete: toBeDeleted } = data
    const added = await Promise.all(add.map(async item => await create(item, item.type, userId)))
    const updated = await Promise.all(update.map(async item => await update(item, item.type, userId)))
    const deleted = await Promise.all(toBeDeleted.map(async item => await deleteOne(item.type, item.id )))
    return {
        added,
        updated,
        deleted
    }
}

export {
    create,
    update,
    deleteOne,
    getNotesByUserId,
    synchronise
}