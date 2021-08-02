import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const Note = sequelize.define(
    'note',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "User",
            referencesKey: "id",
        },
        content: {
            type: Sequelize.STRING(2550),
            allowNull: false,
        },
        background: {
            type: Sequelize.STRING(255)
        }
    },
    {   
        timestamps: true,
        tableName: 'Notes',
        freezeTableName: true,
    }
)

export {
    Note
}