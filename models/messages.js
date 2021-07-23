import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const Message = sequelize.define(
    'message',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        associationId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "UserAssociation"
        },
        content: {
            type: Sequelize.STRING(2550),
            allowNull: false
        },
        toId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            allowNull: false,
        },
        fromId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            allowNull: false,
        },
        seen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {   
        timestamps: true,
        tableName: 'Message',
        freezeTableName: true,
    }
)

export {
    Message
}