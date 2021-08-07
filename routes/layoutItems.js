import express from 'express'
import ev from 'express-validator'
import { 
    createItems,
    updateItems
} from '../controllers/layoutItems.js'

const layoutItems = express.Router()

layoutItems.post(
    '/',
    [
        ev
            .body().isArray(),
        ev
            .body('*.x')
            .notEmpty(),
        ev
            .body('*.y')
            .notEmpty(),
        ev
            .body('*.w')
            .notEmpty(),
        ev
            .body('*.h')
            .notEmpty(),
        ev
            .body('*.i')
            .notEmpty(),
        ev
            .body('*.breakpoint')
            .notEmpty(),
        ev
            .body('*.layout')
            .isIn(['main', 'transactions'])
    ],
    createItems
)

layoutItems.put(
    '/',
    [
        ev
            .body().isArray(),
        ev
            .body('*.x')
            .notEmpty(),
        ev
            .body('*.y')
            .notEmpty(),
        ev
            .body('*.w')
            .notEmpty(),
        ev
            .body('*.h')
            .notEmpty(),
        ev
            .body('*.i')
            .notEmpty(),
        ev
            .body('*.breakpoint')
            .notEmpty(),
        ev
            .body('*.layout')
            .isIn(['main', 'transactions'])
    ],
    updateItems
)




export default layoutItems