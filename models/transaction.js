import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const Transaction = sequelize.define(
    'transaction',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            allowNull: false,
        },
        categoryId: {
            type: Sequelize.CHAR(32),
            references: "Category",
            referencesKey: "id",
            allowNull: false
        },
        walletId: {
            type: Sequelize.CHAR(32),
            references: "Wallet",
            referencesKey: "id"
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        amount: {
            type: Sequelize.DECIMAL(16, 2),
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM,
            values: ['expense', 'income'],
            allowNull: false
        },
        counterparty: {
            type: Sequelize.STRING(500),
        },


    },
    {   
        timestamps: true,
        tableName: 'Transaction',
        freezeTableName: true,
    } 
)

export {
    Transaction
}