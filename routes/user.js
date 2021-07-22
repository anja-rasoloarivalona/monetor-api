import express from 'express'
import ev from 'express-validator'
import { 
    findUser,
    requestFriendship
} from '../controllers/user.js'

const user = express.Router()

user.get(
    '/',
    [
        ev.check("username").notEmpty()
    ],
    findUser
)

user.post(
    '/relation/request',
    [
        ev.check("toId").notEmpty()
    ],
    requestFriendship
)

export default user