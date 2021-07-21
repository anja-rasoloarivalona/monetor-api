import express from 'express'
import middleware from '../middlewares/index.js'
import authentication from './authentication.js'
import categories from './categories.js'
import setup from './setup.js'
import todo from './todo.js'
import transaction from './transaction.js'

const routes = express.Router()

routes.use(middleware.cors)
routes.use(middleware.response)
routes.use("/categories", categories)
routes.use("/", authentication)
routes.use("/", middleware.authMiddleware)
routes.use("/setup", setup)
routes.use("/todo", todo)
routes.use("/transaction", transaction)

export default routes