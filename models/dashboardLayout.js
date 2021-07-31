import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const DashboardLayout = sequelize.define(
    'dashboardLayout',
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
        dashboardType: {
            type: Sequelize.ENUM('main', 'transaction')
        }
    },
    {   
        timestamps: false,
        tableName: 'dashboardLayout',
        freezeTableName: true,
    }
)

const DashboardLayoutItem = sequelize.define(
    'dashboardLayoutItem',
    {
        layoutId: {
            type: Sequelize.CHAR(32),
            references: "dashboardLayout",
            referencesKey: "id",
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
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        breakpoint: {
            type: Sequelize.CHAR(3),
            allowNull: false
        }
    },
    {   
        timestamps: false,
        tableName: 'dashboardLayoutItem',
        freezeTableName: true,
    }
)

export {
    DashboardLayout,
    DashboardLayoutItem
}