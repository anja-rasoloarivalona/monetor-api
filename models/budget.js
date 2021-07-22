import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const Budget = sequelize.define(
    'budget',
    {
        id: {
            type: Sequelize.CHAR(32),
            references: "Category",
            referencesKey: "id",
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            allowNull: false,
            primaryKey: true
        },
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        frequency: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        budgetType: {
            type: Sequelize.ENUM('variable', 'fixed'),
        },
        lastPaiementDate: {
            type: Sequelize.DATE,
        },
        periodStart: {
            type: Sequelize.DATE,
        },
        periodEnd: {
            type: Sequelize.DATE,
        }
    },
    {   
        timestamps: false,
        tableName: 'Budget',
        freezeTableName: true,
    }
)

export {
    Budget
}