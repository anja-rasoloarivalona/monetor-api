import { LayoutItem } from "../models/index.js"
import { generateId  } from '../utils/index.js'


const createOneHandler = async (item, userId) => {
    const layoutItem = await LayoutItem.create({
        userId,
        id: generateId(),
        ...item
    })
    return layoutItem || false
}


const createManyHandler = async(items, userId) => {
    const layoutItems = await Promise.all(items.map(item => createOneHandler(item, userId)))
    return layoutItems || false
}


const updateOneHandler = async(item , userId) => {    
    const layoutItem = await LayoutItem.update({
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
    }, {
        where: {
            userId,
            id: item.id
        }
    })
    return layoutItem || false
}

const updateManyHandler = async (items, userId ) => {
    return await Promise.all(items.map(item => updateOneHandler(item, userId )))
}



export {
    createOneHandler,
    createManyHandler,
    updateOneHandler,
    updateManyHandler
}