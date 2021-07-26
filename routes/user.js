import express from 'express'
import ev from 'express-validator'
import { 
    findUser,
    requestFriendship,
    uploadeProfileImage
} from '../controllers/user.js'
import multer from '../helpers/multer.js'

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


user.post(
    '/profile/image',
    [
        multer.singleImage
    ],
    uploadeProfileImage
)

export default user