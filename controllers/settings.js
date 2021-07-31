import ev from 'express-validator'
import { Settings } from '../models/index.js'
import { updateDefaultBackground } from '../services/settingsService.js'

const setDefaultBackground = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: {imageUrl}, userId  } = req
        const success = await updateDefaultBackground({
            imageUrl,
            userId
        })
        if(success){
            return res.success([], `Default background updated successfully`, 200)
        }
    }
    return res.error(errors, `Settings default background failed`, 500)
}

export {
    setDefaultBackground
}