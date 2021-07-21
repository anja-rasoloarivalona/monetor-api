import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const Access = sequelize.define(
    'Access',
    {
        userId: {
            type: Sequelize.CHAR(32),
            references: "User",
            referencesKey: "id",
            primaryKey: true
        },
        confirmationEmailToken: {
            type: Sequelize.CHAR(32),
            defaultValue: null
        },
        verifyEmailToken: {
            type: Sequelize.CHAR(32),
            defaultValue: null
        },
        changePasswordToken: {
            type: Sequelize.STRING(255), // @TO DO Using JWT : Add logic to check date validity
            defaultValue: null
        },
        resetPasswordEmailToken: {
            type: Sequelize.CHAR(32),
            defaultValue: null
        }
    },
    {
        timestamps: true,
        tableName: "Access",
        freezeTableName: true,
    }
)

export {
    Access
}