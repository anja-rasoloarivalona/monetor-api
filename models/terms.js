import Sequelize from 'sequelize';
import sequelize from './sequelize.js'

const Terms = sequelize.define(
    'Terms',
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
        version: {
            type: Sequelize.CHAR(5),
            allowNull: false
        },
        ipAddress: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        }
    },
    {   
        timestamps: false,
        tableName: 'Terms',
        freezeTableName: true,
    }
)

export {
    Terms
}