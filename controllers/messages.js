import ev from 'express-validator'
import { create } from '../services/messagesService.js'

const addMessage = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const message = await create({
            ...data,
            userId
        })
        if(message){
            return res.success(message, "Message sent", 200)
        }
        return res.success([], "Failed to send message", 500)
    }
    return res.success(errors, "Failed to send message", 500)
}

export {
    addMessage
}