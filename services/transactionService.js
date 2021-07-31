import { User, UserAssociation, Budget, Settings, Wallet, TodoList, Todo, TodoChecklist, Transaction, Category, Message, Image } from '../models/index.js'
import { generateId, } from '../utils/index.js'
import { updateUserBalance } from '../services/userService.js'

const addTransactionHandler = async (data, userId) => {
    const transaction = {
        id: data.id ? data.id : generateId(),
        userId,
        ...data
    }
    const response = await Promise.all(
        [
            await Transaction.upsert(transaction),
            await updateUserBalance(userId, parseFloat(data.amount), "add")
        ]
    )
    const [ transactionInserted, userBalanceUpdated ] = response
    return transactionInserted && userBalanceUpdated
}

const editTransactionHandler = async (data, userId) => {
    const previousTransaction = await Transaction.findOne({
        where: {
            id: data.id,
            userId
        }
    })
    const amount = parseFloat(previousTransaction.amount) 
    await updateUserBalance(userId, amount, previousTransaction.type === "expense" ? "add" : "subtract")
    return addTransactionHandler(data, userId)
}

const deleteTransactionHandler = async (data, userId ) => {
    const previousTransaction = await Transaction.findOne({
        where: {
            id: data.id,
            userId
        }
    })
    const amount = parseFloat(previousTransaction.amount) 
    await updateUserBalance(userId, amount, previousTransaction.type === "expense" ? "add" : "subtract")
    return await previousTransaction.destroy()
}



export {
    addTransactionHandler,
    editTransactionHandler,
    deleteTransactionHandler
}
