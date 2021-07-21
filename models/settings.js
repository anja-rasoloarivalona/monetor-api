import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const Settings = sequelize.define(
    'settings',
    {
        userId: {
            type: Sequelize.CHAR(32),
            references: "user",
            referencesKey: "id",
            allowNull: false,
            primaryKey: true
        },
        currency: {
            type: Sequelize.STRING(255)
        }
    },
    {   
        timestamps: false,
        tableName: 'Settings',
        freezeTableName: true,
    }
)

export {
    Settings
}