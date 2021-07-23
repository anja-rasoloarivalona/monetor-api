import ev from 'express-validator'
import { Transaction, Wallet, User, Category } from '../models/index.js'
import { generateId } from '../utils/index.js'

const addTransaction = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: data, userId } = req

        const { categoryId, amount, date, counterparty, walletId, type } = data

        const usedWallet = await Wallet.findOne({
            where: {
                id: walletId,
                userId
            }
        })

        if(usedWallet){
            const updatedAmount =
                type === "income" ? 
                parseInt(usedWallet.amount)  + parseInt(amount) : 
                parseInt(usedWallet.amount ) - parseInt(amount) 
            
            await usedWallet.update({ amount: updatedAmount })
            await Transaction.upsert({
                id: generateId(),
                userId,
                categoryId,
                walletId,
                date,
                amount,
                counterparty,
                type
            })

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
        return res.success([], "No wallet found", 404)
    }
    return res.success(errors, "Failed to add transaction", 500)
}

export {
    addTransaction
}