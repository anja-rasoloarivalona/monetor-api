import express from 'express'
import ev from 'express-validator'
import {
    getCategories
} from '../controllers/categories.js'

const categories = express.Router()

categories.get('/', [], getCategories)

export default categories