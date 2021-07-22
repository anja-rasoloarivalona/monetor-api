import { Access } from './access.js'
import { AccessTokens } from './accessTokens.js'
import { Terms } from './terms.js'
import { User, UserRelation } from './user.js'
import { Category, CategoryLocale } from './category.js'
import { Budget } from './budget.js'
import { Wallet } from './wallet.js'
import { Settings } from './settings.js'
import { Todo, TodoList, TodoChecklist } from './todo.js'
import { Transaction } from './transaction.js'

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

User.hasMany(TodoList, {
    sourceKey: "id",
    foreignKey: "userId"
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

User.hasMany(UserRelation, {
    sourceKey: "id",
    foreignKey: "toId",
    as: "contacts"
})

UserRelation.hasOne(User, {
    sourceKey: "fromId",
    foreignKey: "id",
})


export {
    Access,
    AccessTokens,
    Wallet,
    Budget,
    Terms,
    User,
    UserRelation,
    Category,
    CategoryLocale,
    Settings,
    Todo,
    TodoList,
    TodoChecklist,
    Transaction
}