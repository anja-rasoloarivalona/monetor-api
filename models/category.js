import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: Sequelize.CHAR(32),
            primaryKey: true,
            allowNull: false,
        },
        parentId: {
            type: Sequelize.CHAR(32),
            references: 'Category',
            referencesKey: 'id',
        },
        categoryType: {
            type: Sequelize.ENUM('income', 'expense'),
            allowNull: false,
        },
        hierarchy: {
            type: Sequelize.ENUM('parent', 'child'),
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING(255),
            allowNull: false
        },     
        icon: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description: {
            type: Sequelize.CHAR(255),
        }
    },
    {   
        timestamps: false,
        tableName: 'Category',
        freezeTableName: true,
    }
)

const CategoryLocale = sequelize.define(
    'CategoryLocale',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: 'Category',
            referencesKey: 'id',
        },
        locale: {
            type: Sequelize.CHAR(2),
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    },
    {   
        timestamps: false,
        tableName: 'CategoryLocale',
        freezeTableName: true,
    }
)



export {
    Category,
    CategoryLocale,
}