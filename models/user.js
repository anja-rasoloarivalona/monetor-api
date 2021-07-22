import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const User = sequelize.define(
    'user',
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
        country: Sequelize.STRING(255),
        province: Sequelize.STRING(255),
        postalCode: Sequelize.STRING(255),
        lat: Sequelize.DOUBLE,
        lng: Sequelize.DOUBLE,
        setupAt: Sequelize.DATE
    },
    {   
        timestamps: false,
        tableName: 'User',
        freezeTableName: true,
    }
)

const UserRelation = sequelize.define(
    'userRelation',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
        },
        fromId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
        },
        toId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        confirmedAt: {
            type: Sequelize.DATE,
            defaultValue: null
        }
    },
    {   
        timestamps: true,
        tableName: 'UserRelation',
        freezeTableName: true,
    }
)

export {
    User,
    UserRelation
}