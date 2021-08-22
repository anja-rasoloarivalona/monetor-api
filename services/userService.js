import { User, UserAssociation, Budget, Settings, Wallet, TodoBoards, UserTodoBoards, TodoList, Todo, TodoLabels, TodoChecklist, Transaction, Category, Message, Image, Note, LayoutItem, Attachment } from '../models/index.js'
import { generateId } from '../utils/index.js'


const createRelathionship = async data => {
    const {
        toId, fromId
    } = data

    const relationShipId = generateId()

    const fromRelation = await UserAssociation.create({
        id: relationShipId,
        fromId,
        toId,
        confirmedAt: new Date()
    })

    const toRelation = await UserAssociation.create({
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
                model: Note,
                as: "notes"
            },
            {
                model: LayoutItem,
                as: "layoutItems",
            },
            {
                model: UserAssociation,
                as: "contacts",
                attributes: [
                    "id","confirmedAt"
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            "id", "firstname", "lastname", "email", "city", "country", "balance"
                        ]
                    },
                    {
                        model: Message,
                        as: "messages",
                        limit: 1,
                        order: [['createdAt', 'DESC']]
                    },
                ],

            },
            // {
            //     model: UserTodoBoards,
            //     as: "todoBoards",
            //     attributes: [ "boardId", "isAdmin", "rule", "backgroundImage" ],
            //     include: [
            //         {
            //             model: TodoBoards,
            //             attributes: ["title"],
            //             include: [
            //                 {
            //                     model: TodoList,
            //                     include: {
            //                         model: Todo,
            //                         include: [
            //                             {
            //                                 model: TodoChecklist,
            //                                 as: "checkList"
            //                             },
            //                             {
            //                                 model: TodoLabels,
            //                                 as: "todoLabels",
            //                                 attributes: ['boardId', 'id']
            //                             },
            //                             {
            //                                 model: Attachment
            //                             }
            //                         ]
            //                     }
            //                 }
            //             ]
            //         },
            //         {
            //             model: TodoLabels,
            //             as: "labels"
            //         }
            //     ]
            // },
            {
                model: Image,
                as: "images"
            }
        ]
    })

    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        balance: user.balance,
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
        contacts: user.contacts,
        images: user.images,
        // todoBoards: user.todoBoards,
        notes: user.notes,
        layoutItems: user.layoutItems
    }
}


const updateUserBalance = async (userId, value, action ) => {
    const user = await User.findOne({
        where: {
            id: userId
        }
    })
    if(!action){
        return await user.update({
            balance: value
        })
    }
    const userBalance = parseFloat(user.balance)
    const updatedBalance = action === "add" ? userBalance + value : userBalance - value                              
    return await user.update({
        balance: updatedBalance
    })
}

export {
    getUserById,
    getUserByEMail,
    sanitizeUser,
    createRelathionship,
    updateUserBalance
}