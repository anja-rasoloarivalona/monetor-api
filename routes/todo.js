import express from 'express'
import ev from 'express-validator'
import { 
    createHandler,
    updateHandler,
    deleteHandler
} from '../controllers/todo.js'

const todo = express.Router()

todo.post(
    "/",
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList']),
        ev
            .check('title')
            .notEmpty(),
        ev
            .check('index')
            .notEmpty(),
         ev
            .check('todoListId')
            .if((value, {req}) => req.body.type === "todo")
            .notEmpty(),
        ev
            .check('todoId')
            .if((value, {req}) => req.body.type === "checkList")
            .notEmpty()
    ],
    createHandler
)

todo.put(
    "/",
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList']),
        ev
            .check('title')
            .notEmpty(),
        ev
            .check('index')
            .notEmpty(),
         ev
            .check('todoListId')
            .if((value, {req}) => req.body.type === "todo")
            .notEmpty(),
        ev
            .check('todoId')
            .if((value, {req}) => req.body.type === "checkList")
            .notEmpty()
    ],
    updateHandler
)

todo.put(
    "/many",
    [
        ev
            .body().isArray(),
        ev
            .body('*.type')
            .isIn(['list', 'todo', 'checkList']),
        ev
            .body('*.title')
            .notEmpty(),
        ev
            .body('*.index')
            .notEmpty(),
         ev
            .body('*.todoListId')
            .if((value, {req}) => {
                const current = req.body.find( i => i.id === value.id)
                return current.type === "todo"
            })
            .notEmpty(),
        ev
            .body('*.todoId')
            .if((value, {req}) => {
                const current = req.body.find( i => i.id === value.id)
                return current.type === "checkList"
            })
            .notEmpty()
    ],
    updateHandler
)

todo.delete(
    '/',
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList']),
        ev
            .check('id')
            .notEmpty()
    ],
    deleteHandler
)

export default todo