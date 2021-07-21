import express from 'express'
import ev from 'express-validator'
import {
    login,
    signup,
    verifyAccessToken
} from '../controllers/authentication.js'

const authentication = express.Router()


authentication.post(
    '/login',
    [
        ev.check('email').isEmail().notEmpty(),
        ev.check('password').notEmpty(),
    ],
    login
)

authentication.post(
    '/signup',
    [
        ev.check('email').isEmail().notEmpty(),
        ev.check('username').notEmpty(),
        ev.check('password').notEmpty(),
        // ev.check('lang').notEmpty(),
        ev.check('ipAddress').notEmpty(),
    ],
    signup
)

authentication.post(
    '/verify-token',
    [
        ev.check('token').notEmpty()
    ],
    verifyAccessToken
)

export default authentication