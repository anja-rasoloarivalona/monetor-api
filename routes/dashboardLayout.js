import express from 'express'
import ev from 'express-validator'
import { 
    setLayout
} from '../controllers/dashboardLayout.js'

const dashboardLayout = express.Router()

dashboardLayout.post(
    '/',
    [
        ev
            .check('dashboardType')
            .isIn(['main', 'transaction'])
            .notEmpty(),
        ev
            .check('items')
            .isArray(),
        ev
            .check('items.*.x')
            .notEmpty(),
        ev
            .check('items.*.y')
            .notEmpty(),
        ev
            .check('items.*.w')
            .notEmpty(),
        ev
            .check('items.*.h')
            .notEmpty(),
        ev
            .check('items.*.name')
            .notEmpty(),
        ev
            .check('items.*.breakpoint')
            .notEmpty()
    ],
    setLayout
)

export default setLayout