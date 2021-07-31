import express from 'express'
import ev from 'express-validator'
import { 
    setDefaultBackground
} from '../controllers/settings.js'

const settings = express.Router()

settings.post(
    "/",
    [
        ev
            .check("imageUrl")
            .notEmpty(),
    ],
    setDefaultBackground
)

export default transaction