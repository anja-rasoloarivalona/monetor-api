import { User, UserRelation, Budget, Settings, Wallet, TodoList, Todo, TodoChecklist, Transaction, Category } from '../models/index.js'
import { generateId } from '../utils/index.js'

const createRelathionship = async data => {
    const {
        toId, fromId
    } = data

    const relationShipId = generateId()

    const fromRelation = await UserRelation.create({
        id: relationShipId,
        fromId,
        toId,
        confirmedAt: new Date()
    })

    const toRelation = await UserRelation.create({
        id: relationShipId,
        fromId: toId,
        toId: fromId
    })

    return {
        fromRelation,
        toRelation
    }

}

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
                model: UserRelation,
                as: "contacts",
                attributes: [
                    "id","confirmedAt"
                ],
                include: {
                    model: User,
                    attributes: [
                        "id", "username", "email", "city", "country"
                    ]
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

    console.log({
        user
    })

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        budgets: user.budgets,
        settings: user.setting,
        wallets: user.wallets,
        todoLists: user.todoLists,
        transactions: user.transactions,
        city: user.city,
        country: user.country,
        province: user.province,
        postalCode: user.postalCode,
        lat: user.lat,
        lng: user.lng,
        setupAt: user.setupAt,
        contacts: user.contacts
    }
}


export {
    getUserById,
    getUserByEMail,
    sanitizeUser,
    createRelathionship
}