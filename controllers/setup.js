import ev from 'express-validator';
import { Wallet, Budget, Settings } from '../models/index.js'
import { generateId } from '../utils/index.js'
import { sanitizeUser } from '../services/userService.js'

const initSetup = async(req, res) => {
    const errors = ev.validationResult(req)

    if(errors.isEmpty()){
        const { body: { currency, assets, budgets }, userId } = req

        await Settings.create({
            userId,
            currency: JSON.stringify(currency)
        })

        if(budgets && budgets.length > 0){
            await Promise.all(budgets.map(async (item) => {
                await Budget.create({
                    userId,
                    ...item
                })                
            }));
        }
        if(assets && assets.length > 0){
            await Promise.all(assets.map(async (item) => {
                await Wallet.upsert({
                    id: generateId(),
                    userId,
                    ...item
                })                
            }));
        }
        const user = await sanitizeUser(userId)
        return res.success(user, 'Setup account successful', 201);
    }
    return res.error(errors, [], 500)
}

export {
    initSetup
}