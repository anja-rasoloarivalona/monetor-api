import { User, Budget, Settings, Wallet, TodoList, Todo, TodoChecklist, Transaction, Category } from '../models/index.js'

const getUserById = async userId => {
    const user = await User.findOne({
        where: { id: userId }
    })
    return user ? user : false
}

const getUserByEMail = async email => {
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if(user){
        return user
    }
    return false
}

const sanitizeUser = async userId => {
    const user = await User.findOne({
        where: { id: userId },
        include: [
            {
                model: Budget
            },
            {
                model: Settings
            },
            {
                model: Wallet
            },
            {
                model: Transaction,
                as: "transactions",
                include: {
                    model: Category,
                    as: "category"
                }
            },  
            {
                model: TodoList,
                include: {
                    model: Todo,
                    include: {
                        model: TodoChecklist,
                        as: "checkList"
                    }
                }
            }
        ]
    })


    return {
        id: user.id,
        username: user.username,
        email: user.email,
        budgets: user.budgets,
        settings: user.setting,
        wallets: user.wallets,
        todoLists: user.todoLists,
        transactions: user.transactions
    }
}

export {
    getUserById,
    getUserByEMail,
    sanitizeUser
}