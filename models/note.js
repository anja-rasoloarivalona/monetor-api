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
            references: "User",
            referencesKey: "id",
        },
        folderId: {
            type: Sequelize.CHAR(32),
            references: "notesfolder",
            referencesKey: "id",
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
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

const NotesFolder = sequelize.define(
    'notesFolder',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            references: "User",
            referencesKey: "id",
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        index: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        parentId: {
            type: Sequelize.CHAR(32),
            references: 'notesFolder',
            referencesKey: 'id',
        }
    },
    {   
        timestamps: true,
        tableName: 'NotesFolder',
        freezeTableName: true,
    }
)

export {
    Note,
    NotesFolder
}