import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const Attachment = sequelize.define(
    'attachment',
    {
        id: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            primaryKey: true,
            allowNull: false
        },
        url: {
            type: Sequelize.STRING(2550),
            allowNull: false
        },
        ownerType: {
            type: Sequelize.ENUM('transaction', 'note', 'todo'),
            allowNull: false
        },
        ownerId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(255)
        }
    },
    {   
        timestamps: true,
        tableName: 'Attachment',
        freezeTableName: true,
    }
)

export {
    Attachment
}