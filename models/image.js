import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const Image = sequelize.define(
    'image',
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
            primaryKey: true
        },
        type: {
            type: Sequelize.ENUM("profile", "board"),
        },
        url: {
            type: Sequelize.STRING(2550),
        },
        active: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    },
    {   
        timestamps: false,
        tableName: 'Image',
        freezeTableName: true,
    }
)

export {
    Image
}