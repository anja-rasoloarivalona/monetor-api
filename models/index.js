import { Access } from './access.js'
import { AccessTokens } from './accessTokens.js'
import { Terms } from './terms.js'
import { User, UserAssociation } from './user.js'
import { Category, CategoryLocale } from './category.js'
import { Budget } from './budget.js'
import { Wallet } from './wallet.js'
import { Settings } from './settings.js'
import { Todo, TodoList, TodoChecklist, TodoBoards, TodoLabels, TodoLabelsAssociation, UserTodoBoards } from './todo.js'
import { Transaction } from './transaction.js'
import { Message } from './messages.js'
import { Image } from './image.js'
import { LayoutItem } from './layoutItems.js'
import { Note } from './note.js'
import { Attachment } from './attachment.js'

Category.belongsTo(Category, {
    as: 'parent',
    sourceKey: 'id',
    foreignKey: 'parentId',

})

Category.hasMany(Category, {
    as: 'children',
    sourceKey: "id",
    foreignKey: "parentId",
})

Category.hasMany(CategoryLocale,{
    as: "locale",
    foreignKey: "id",
    sourceKey: "id"
})

User.hasMany(Budget, {
    sourceKey: "id",
    foreignKey: "userId"
})

User.hasOne(Settings, {
    sourceKey: "id",
    foreignKey: "userId"
})

User.hasMany(Wallet, {
    sourceKey: "id",
    foreignKey: "userId"
})

User.hasMany(UserTodoBoards, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "todoBoards"
})

UserTodoBoards.hasMany(User, {
    sourceKey: "userId",
    foreignKey: "id"
})

UserTodoBoards.hasOne(TodoBoards, {
    sourceKey: "boardId",
    foreignKey: "id"
})

UserTodoBoards.hasMany(TodoLabels, {
    sourceKey: "boardId",
    foreignKey: "boardId",
    as: "labels"
})

TodoLabels.belongsTo(UserTodoBoards, {
    sourceKey: "boardId",
    foreignKey: "boardId",
})

TodoBoards.belongsTo(UserTodoBoards, {
    sourceKey: "userId",
    foreignKey: "id"
})

TodoBoards.hasMany(TodoList, {
    sourceKey: "id",
    foreignKey: "boardId"
})


TodoList.hasMany(Todo, {
    sourceKey: "id",
    foreignKey: "todoListId"
})

Todo.hasMany(TodoChecklist, {
    sourceKey: "id",
    foreignKey: "todoId",
    as: "checkList"
})

Todo.hasMany(Attachment, {
    sourceKey: "id",
    foreignKey: "ownerId",
})

Todo.belongsToMany(TodoLabels, {
    through: TodoLabelsAssociation,
    as: "todoLabels",
    foreignKey: "todoId",
    sourceKey: "id"
})


TodoLabels.belongsToMany(Todo, {
    through: TodoLabelsAssociation,
    as: "todos",
    foreignKey: "labelId",
    sourceKey: "id"
})

User.hasMany(Transaction, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "transactions"
})

Transaction.hasOne(Category, {
    sourceKey: "categoryId",
    foreignKey: "id",
    as: "category"
})

Transaction.hasMany(Attachment, {
    sourceKey: "id",
    foreignKey: "ownerId",
})


User.hasMany(UserAssociation, {
    sourceKey: "id",
    foreignKey: "toId",
    as: "contacts"
})

UserAssociation.hasOne(User, {
    sourceKey: "fromId",
    foreignKey: "id",
})

UserAssociation.hasMany(Message, {
    sourceKey: "id",
    foreignKey: "associationId",
    as: "messages"
})

User.hasMany(Image, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "images"
})


User.hasMany(LayoutItem, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "layoutItems"
})


User.hasMany(Note, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "notes"
})

Note.hasMany(Attachment, {
    sourceKey: "id",
    foreignKey: "ownerId",
})

export {
    Access,
    AccessTokens,
    Wallet,
    Budget,
    Terms,
    User,
    UserAssociation,
    Category,
    CategoryLocale,
    Settings,
    Todo,
    TodoList,
    TodoChecklist,
    TodoLabels,
    TodoLabelsAssociation,
    Transaction,
    Message,
    Image,
    TodoBoards,
    UserTodoBoards,
    LayoutItem,
    Note,
    Attachment
}