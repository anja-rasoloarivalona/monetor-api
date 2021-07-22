import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const Wallet = sequelize.define(
    'wallet',
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
        type: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(255),
        },
        amount: {
            type: Sequelize.DOUBLE,
            defaultValue: 0,
            allowNull: false
        },
        creditLimit: {
            type: Sequelize.DOUBLE,
            defaultValue: null,
            field: "creditLimit"
        }
    },
    {   
        timestamps: false,
        tableName: 'Wallet',
        freezeTableName: true,
    }
)

export {
    Wallet
}