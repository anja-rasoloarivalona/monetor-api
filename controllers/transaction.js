import ev from 'express-validator'
import { Transaction, Wallet, User, Category } from '../models/index.js'
import { generateId } from '../utils/index.js'
import { updateUserBalance } from '../services/userService.js'
import { addTransactionHandler, editTransactionHandler, deleteTransactionHandler } from '../services/transactionService.js'

const addTransaction = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req
        const {  amount, walletId, type } = data
        const usedWallet = await Wallet.findOne({
            where: {
                id: walletId,
                userId
            }
        })
        if(usedWallet){
            const updatedAmount =
                type === "income" ? 
                parseFloat(usedWallet.amount)  + parseFloat(amount) : 
                parseFloat(usedWallet.amount ) - parseFloat(amount) 
            await usedWallet.update({ amount: updatedAmount })
        }
        const isTransactionAdded = await addTransactionHandler(data, userId )
        console.log({
            isTransactionAdded
        })
        if(isTransactionAdded){
            const user = await User.findOne({
                where: {
                    id: userId
                },
                attributes: [],
                include: [
                    {
                        model: Transaction,
                        as: "transactions",
                        include: {
                            model: Category,
                            as: "category"
                        }
                    },
                    {
                        model: Wallet
                    }
                ]
            })
            return res.success(user, "Added transaction successfully", 200)
        }
    }
    return res.success(errors, "Failed to add transaction", 500)
}

export {
    addTransaction
}