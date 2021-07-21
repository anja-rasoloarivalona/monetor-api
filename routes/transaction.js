import express from 'express'
import ev from 'express-validator'
import { 
    addTransaction
} from '../controllers/transaction.js'

const transaction = express.Router()

transaction.post(
    "/",
    [
        ev
            .check("type")
            .isIn(['income', 'expense'])
            .notEmpty(),
        ev
            .check("categoryId")
            .notEmpty(),
        ev
            .check("date")
            .notEmpty(),
        ev
            .check('walletId')
            .notEmpty(),
        ev
            .check('amount')
            .notEmpty()
    ],
    addTransaction
)

export default transaction