import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const LayoutItem = sequelize.define(
    'layoutItem',
    {
        userId: {
            type: Sequelize.CHAR(32),
            references: "user",
            referencesKey: "id",
            allowNull: false,
            primaryKey: true
        },
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        x: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        y: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        w: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        h: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        i: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        breakpoint: {
            type: Sequelize.CHAR(3),
            allowNull: false
        },
        layout: {
            type: Sequelize.ENUM('main', 'transactions')
        }
    },
    {   
        timestamps: false,
        tableName: 'layoutItems',
        freezeTableName: true,
    }
)

export {
    LayoutItem
}