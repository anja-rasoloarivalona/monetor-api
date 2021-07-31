import { DashboardLayout, DashboardLayoutItem } from "../models/index.js"
import { generateId  } from '../utils/index.js'


const createLayoutHandler = async data => {
    const { userId, dashboardType } = data
    return  await DashboardLayout.create({
        id: generateId(),
        userId,
        dashboardType
    })
}

const setLayoutHandler = async (data) => {
    const { userId, items, init, dashboardType } = data
    if(init){
        const layout = await createLayoutHandler({userId, dashboardType })
        const layoutItems = await setLayoutItemsHandler(items.map(item => ({ ...item, layoutId: layout.id})))
        return {
            layout,
            layoutItems
        }
    }
}

const setLayoutItemsHandler = async items => {
    return await Promise.all(items.map(async item => {
        return await DashboardLayoutItem.upsert(item)
    }))
}

export {
    createLayoutHandler,
    setLayoutHandler,
    setLayoutItemsHandler
}