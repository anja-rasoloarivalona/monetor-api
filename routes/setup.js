import express from 'express'
import ev from 'express-validator'
import {
    initSetup
} from '../controllers/setup.js'

const setup = express.Router()

setup.post(
    '/init',
    [
        ev.check('currency').notEmpty(),
        ev.check('assets').notEmpty(),
    ],
    initSetup
)

export default setup