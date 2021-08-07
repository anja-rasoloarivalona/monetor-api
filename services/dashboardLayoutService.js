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
    const { userId, items, dashboardType } = data

    const userLayout = await DashboardLayout.findOne({
        where: {
            userId,
            dashboardType
        }
    })
    if(userLayout){
        const layoutItems = await setLayoutItemsHandler(items)
        return {
            layoutItems
        }
    } else {
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