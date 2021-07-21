import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const User = sequelize.define(
    'User',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        city: Sequelize.STRING(255),
        country: Sequelize.STRING(255)
    },
    {   
        timestamps: false,
        tableName: 'User',
        freezeTableName: true,
    }
)

export {
    User
}