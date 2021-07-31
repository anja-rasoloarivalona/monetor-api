import ev from 'express-validator'
import { setLayoutHandler } from '../services/dashboardLayoutService.js'


const setLayout = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const { layoutItems } = await setLayoutHandler({
            userId,
            items: data.items,
            init: data.init,
            dashboardType: data.dashboardType
        })
        return res.success(layoutItems, "Items saved successfully", 200)
    }
    return res.success(errors, "Failed to save items", 500)
}

export {
    setLayout
}