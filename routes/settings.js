import express from 'express'
import ev from 'express-validator'
import { 
    setDefaultBackground
} from '../controllers/settings.js'

const settings = express.Router()

settings.post(
    "/default-background",
    [
        ev
            .check("imageUrl")
            .notEmpty(),
    ],
    setDefaultBackground
)

export default settings