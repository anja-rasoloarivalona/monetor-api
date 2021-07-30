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
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING(255),
        },
        lastname: {
            type: Sequelize.STRING(255),
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
        setupAt: Sequelize.DATE,
        balance: Sequelize.DOUBLE,
    },
    {   
        timestamps: false,
        tableName: 'User',
        freezeTableName: true,
    }
)

const UserAssociation = sequelize.define(
    'userAssociation',
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
        tableName: 'UserAssociation',
        freezeTableName: true,
    }
)

export {
    User,
    UserAssociation
}