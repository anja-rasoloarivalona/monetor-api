import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const AccessTokens = sequelize.define(
    'AccessTokens',
    {
        userId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            primaryKey: true,
        },
        token: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        revoked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {   
        timestamps: false,
        tableName: 'access_tokens',
        freezeTableName: true,
    }
)

export {
    AccessTokens
}