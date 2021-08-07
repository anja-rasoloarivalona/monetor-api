import { Access } from './access.js'
import { AccessTokens } from './accessTokens.js'
import { Terms } from './terms.js'
import { User, UserAssociation } from './user.js'
import { Category, CategoryLocale } from './category.js'
import { Budget } from './budget.js'
import { Wallet } from './wallet.js'
import { Settings } from './settings.js'
import { Todo, TodoList, TodoChecklist, TodoBoards, UserTodoBoards } from './todo.js'
import { Transaction } from './transaction.js'
import { Message } from './messages.js'
import { Image } from './image.js'
import { DashboardLayout, DashboardLayoutItem } from './dashboardLayout.js'
import { Note } from './note.js'

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


User.hasMany(DashboardLayout, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "layouts"
})

DashboardLayout.hasMany(DashboardLayoutItem, {
    sourceKey: "id",
    foreignKey: "id",
    as: "items"
})


User.hasMany(Note, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "notes"
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
    Transaction,
    Message,
    Image,
    TodoBoards,
    UserTodoBoards,
    DashboardLayout,
    DashboardLayoutItem,
    Note
}