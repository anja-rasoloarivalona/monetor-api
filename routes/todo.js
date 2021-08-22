import express from 'express'
import ev from 'express-validator'
import { 
    createHandler,
    updateHandler,
    deleteHandler,
    initBoardHandler,
    getUserBoardsHandler,
    updateBoardBackground,
    addLabel,
    removeLabel,
    addAttachment,
} from '../controllers/todo.js'
import multer from '../helpers/multer.js'

const todo = express.Router()

todo.post(
    "/",
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList', 'label']),
        ev
            .check('title')
            .notEmpty(),
        ev
            .check('index')
            .if((value, {req}) => {
                return req.body.type !== "label"
            })
            .notEmpty(),
         ev
            .check('todoListId')
            .if((value, {req}) => {
                if(!req.body.unlisted){
                    return req.body.type === "todo"
                } return false
            })
            .notEmpty(),
        ev
            .check('todoId')
            .if((value, {req}) => req.body.type === "checkList")
            .notEmpty(),
        ev
            .check('color')
            .if((value, {req}) =>  req.body.type === "label")
            .notEmpty(),
        ev
            .check('boardId')
            .if((value, {req}) =>  req.body.type === "label")
            .notEmpty(),
    ],
    createHandler
)

todo.put(
    "/",
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList', 'label']),
        ev
            .check('title')
            .notEmpty(),
        ev
            .check('index')
            .if((value, {req}) => {
                return req.body.type !== "label"
            })
            .notEmpty(),
         ev
            .check('todoListId')
            .if((value, {req}) => req.body.type === "todo")
            .notEmpty(),
        ev
            .check('todoId')
            .if((value, {req}) => req.body.type === "checkList")
            .notEmpty(),
         ev
            .check('color')
            .if((value, {req}) =>  req.body.type === "label")
            .notEmpty(),
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
            .if((value, {req}) => {
                const current = req.body.find( i => i.id === value.id)
                return current.type !== "label"
            })
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
            .notEmpty(),
        ev
            .body('*.color')
            .if((value, {req}) =>  {
                const current = req.body.find( i => i.id === value.id)
                return current.type === "label"
            })
            .notEmpty(),
    ],
    updateHandler
)

todo.delete(
    '/',
    [
        ev
            .check('type')
            .isIn(['list', 'todo', 'checkList', 'label']),
        ev
            .check('id')
            .notEmpty()
    ],
    deleteHandler
)


todo.post(
    '/board/background',
    [
        multer.singleFile,
        ev
            .check("boardId")
            .notEmpty()
    ],
    updateBoardBackground
)

todo.post(
    '/label',
    [
        ev
            .check('todoId')
            .notEmpty(),
        ev
            .check('labelId')
            .notEmpty(),
    ],
    addLabel
)

todo.delete(
    '/label',
    [
        ev
            .check('todoId')
            .notEmpty(),
        ev
            .check('labelId')
            .notEmpty(),
    ],
    removeLabel
)

todo.post(
    '/attachment',
    [
        multer.singleFile,
        ev
            .check('ownerId')
            .notEmpty()
    ],
    addAttachment
)

todo.post(
    '/board',
    [
        ev
            .check('title')
            .notEmpty(),
        ev
            .check('todoList')
            .isArray(),
        ev
            .check('todoList.*.title')
            .notEmpty(),
        ev
            .check('todoList.*.index')
            .notEmpty()  
    ],
    initBoardHandler
)

todo.get(
    '/boards',
    [],
    getUserBoardsHandler
)

export default todo