import Sequelize from 'sequelize';
import sequelize from "./sequelize.js";

const Weather = sequelize.define(
    'weather',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "User",
            referencesKey: "id",
        },
        city: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        region: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        country: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        lat: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        lng: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        regionCode: {
            type: Sequelize.CHAR(3),
            allowNull: false
        },
        countryCode: {
            type: Sequelize.CHAR(3),
            allowNull: false
        }
    },
    {   
        timestamps: false,
        tableName: 'Weather',
        freezeTableName: true,
    }
)

export {
    Weather
}